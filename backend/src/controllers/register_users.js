// Import necessary modules
const xlsx = require('xlsx');
const { User, Mentee, Mentor } = require('../models');
const { hash } = require('bcrypt');
const validator = require('validator');
const { addUser, validateColumns } = require('../services/user_services');


// to upload an excel file and add user data to database after checking if it's the right excel file
exports.addBulkUsers = async (req, res) => {
    try {
        // Check if the request is sent by admin
        if (req.user.role !== 'Admin') {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        // Check if the role is valid
        const role = req.body.role;
        if (role !== "Mentee" && role !== "Mentor") {
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
            throw error;
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
    // Check if the request is sent by admin
    if (req.user.role !== 'Admin') {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    // need to know the format of the request body
    try {
        const { role, ...userInfo } = req.body;
        if (role !== "Mentee" && role !== "Mentor") {
            return res.status(400).json({ success: false, error: 'Invalid role' });
        }
        // console.log("userinfo in addOneUser in register_users controller: ", userInfo);
        // console.log("role in addOneUser in register_users controller: ", role);

        const result = await addUser(userInfo, role);
        if (result.error) {
            return res.status(400).json({ success: false, error: result.error });
        }
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}





