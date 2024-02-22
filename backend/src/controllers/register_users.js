// Import necessary modules
const xlsx = require('xlsx');
const { User, Mentee, Mentor } = require('../models');
const { hash } = require('bcrypt');
const validator = require('validator');



// to upload an excel file and add user data to database after checking if it's the right excel file
exports.addBulkUsers = async (req, res) => {
    try {
        // Check if the role is valid
        const role = req.body.role;
        if(role !== "Mentee" && role !== "Mentor"){
            return res.status(400).json({ success: false, error: 'Invalid role' });
        }


        // Check if the file is an excel file
        if (!req.file.mimetype.includes('excel')) {
            return res.status(400).json({
                success: false,
                error: 'Please upload an excel file'
            });
        }

        // Access the uploaded file from req.file.buffer
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });

        // Assume the first sheet is used
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // if the sheet is empty, return an error
        if (!sheet) {
            return res.status(400).json({ success: false, error: 'Sheet is empty' });
        }

        // Parse sheet data to JSON
        const usersInfo = xlsx.utils.sheet_to_json(sheet);
        // Get the columns from the first row of the excel file
        const actualColumns = Object.keys(usersInfo[0]);

        // Validate the columns
        const columnsValidation = validateColumns(role, actualColumns);
        if (!columnsValidation.success) {
            return res.status(400).json({ success: false, error: columnsValidation.error });
        }


        // if the columns are valid, add the users to the database
        const userAlreadyExists = []; // we do not want to disrupt entire add users operation due to a user already existing, so we will collect them here
        const userFieldsMissing = []; // we do not want to disrupt entire add users operation due to one or two bad rows, so we will collect them here
        try {
            for (const [index, userInfo] of usersInfo.entries()) {
                const result = await addUser(userInfo, role);
                if (result.error) {
                    if (result.error === 'User already exists') {
                        userAlreadyExists.push(userInfo.email);
                        // userAlreadyExists.push(index); // we can also push the index of the row
                    } 
                    else if (result.error === 'Required field is missing') {
                        userFieldsMissing.push(index);
                    }
                }
            }
        } 
        catch (error) {
            console.error(error);
        }
        // Respond with the parsed data

        res.json({
            status: 'success',
            message: 'Users processed',
            details: {
                totalUsersProcessed: data.length,
                successfulAdds: data.length - userAlreadyExists.length - userFieldsMissing.length,
                userAlreadyExists: userAlreadyExists, // return the emails of the users that already exist
                userFieldsMissing: userFieldsMissing // return the indices of the rows with missing fields
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// add a single user to the database
exports.addOneUser = async (req, res) => {
    // need to know the format of the request body
    const role = req.body.role;
    if (role !== "Mentee" && role !== "Mentor") {
        return res.status(400).json({ success: false, error: 'Invalid role' });
    }

    const userInfo = req.body;
    const result = await addUser(userInfo, role);
    if (result.error) {
        return res.status(400).json({ success: false, error: result.error });
    }
    res.status(201).json({ success: true });
}


// Helper functions
// function to add a mentee to the database
async function addUser(userInfo, role) {
    
    // Check if the email is valid
    if(!validator.isEmail(userInfo.email)){
        return { error: 'Required field is missing' };
    }

    // Check if the email already exists
    const emailExists = await User.findOne({ where: { email: userInfo.email } });
    if(emailExists){
        // If the email already exists, return an error
        return { error: 'User already exists' };
    }

    // Check if the required fields are missing
    if(role === "Mentee"){
        if (isInvalid(userInfo['First Name']) || isInvalid(userInfo['Last Name']) || isInvalid(userInfo['University']) || isInvalid(userInfo['Date of Birth']) || isInvalid(userInfo['City'])) {
            // If any required field is missing, return an error
            return { error: 'Required field is missing' };
        }
    }
    else {
        if (isInvalid(userInfo['First Name']) || isInvalid(userInfo['Last Name']) || isInvalid(userInfo['Experience'])){
            // If any required field is missing, return an error
            return { error: 'Required field is missing' };
        }
    }

    // generate a random password for each user
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await hash(password, 10);

    // if the email is valid and does not exist, and all required fields are present, add the user to the database
    const newUser = await User.create({
        email: userInfo.email,
        password: hashedPassword,
        role: role,
        is_active: true
    });
    
    // then add the user to the mentee or mentor table
    if(role === "Mentee"){
        await Mentee.create({
            user_id: newUser.id,
            first_name: userInfo['First Name'],
            last_name: userInfo['Last Name'],
            university: userInfo['University'],
            dob: userInfo['Date of Birth'],
            home_city: userInfo['City'],
            team_id: null
        });
    }
    else {
        await Mentor.create({
            user_id: newUser.id,
            first_name: userInfo['First Name'],
            last_name: userInfo['Last Name'],
            experience: userInfo['Experience'],
            team_id: null
        });
    }

    return { success: true };
}

// function to validate the columns in the excel file
function validateColumns(role, actualColumns) {
    const menteesExpectedColumns = ['First Name', 'Last Name', 'University', 'Date of Birth', 'City', 'Email'];
    const mentorsExpectedColumns = ['First Name', 'Last Name', 'Experience', 'Email'];
     
    // Check if the role is valid and assign the expected columns based on the role
    let expectedColumns;
    if (role === "Mentee") {
        expectedColumns = menteesExpectedColumns;
    } 
    else {
        expectedColumns = mentorsExpectedColumns;
    } 

    // Check if the number of columns in the excel file match the expected columns
    if (actualColumns.length !== expectedColumns.length) {
        return {
            success: false,
            error: `Expected ${expectedColumns.length} columns but got ${actualColumns.length}`
        };
    }

    // Check if the columns in the excel file match the expected columns
    const missingColumns = expectedColumns.filter(column => !actualColumns.includes(column));
    const extraColumns = actualColumns.filter(column => !expectedColumns.includes(column));

    // if the columns are missing, return an error
    if (missingColumns.length > 0) {
        return {
            success: false,
            error: `These columns are missing from the excel sheet: ${missingColumns.join(', ')} Please add them and try again`
        };
    }

    // if the columns are extra, return an error
    if (extraColumns.length > 0) {
        return {
            success: false,
            error: `These columns are extra in the excel sheet: ${extraColumns.join(', ')}. Please remove them and try again`
        };
    }

    return { success: true };
}

// function to check if a attribute is null, undefined or empty
function isInvalid(value) {
    return value === null || value === undefined || validator.isEmpty(value);
}



