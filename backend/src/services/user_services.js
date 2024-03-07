'use strict';
const { Mentor, User, Mentee } = require('../models');
const { hash } = require('bcrypt');
const validator = require('validator');
const { sequelize } = require('../models');

// service to fetch mentees by mentor
async function fetchMenteesByMentor(mentorUid) {
    console.log("metor id is" + mentorUid)
    try {
        const mentor = await Mentor.findOne({ where: { user_id: mentorUid } });
        const mentorTeamId = mentor.team_id;

        const result = await Mentee.findAll({
            where: { team_id: mentorTeamId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'email'],
                }
            ],
            attributes: ['first_name', 'last_name']
        });
        if (result.length === 0) {
            throw new Error('No mentees found for this mentor.');
        }
        console.log(result);
        return result.map(r => ({
            id: r.user.id,
            email: r.user.email,
            first_name: r.first_name,
            last_name: r.last_name
        }));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// service to fetch mentors by mentee
async function fetchMentorsByMentee(menteeUid) {
    try {
        const menteeTeamId = await fetchTeamId(menteeUid, "Mentee");
        // will throw error here for now because the team_id is set to null in the db
        const result = await Mentor.findAll({
            where: { team_id: menteeTeamId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'email'],
                }
            ],
            attributes: ['first_name', 'last_name']
        });

        return result.map(r => ({
            id: r.user.id,
            email: r.user.email,
            first_name: r.first_name,
            last_name: r.last_name
        }));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// service to add a user to the database
async function addUser(userInfo, role) {
    // sample userInfo object
    // {
    //     "role": "Mentee",
    //         "Email": "john.doe@example.com",
    //             "First Name": "John",
    //                 "Last Name": "Doe",
    //                     "University": "Example University",
    //                         "Date of Birth": "2000-01-01",
    //                             "City": "Example City"
    // }
    // or
    // {
    //     "email": "mentor@example.com",
    //     "First Name": "Jane",
    //     "Last Name": "Doe",
    //     "Experience": "5 years"
    // }

    // function to check if a attribute is null, undefined or empty
    function isInvalid(value) {
        return value === null || value === undefined || validator.isEmpty(String(value));
    }
    // console.log("userInfo in addUser in user_services: ", userInfo);
    try {
        // Check if the email is valid
        if (!validator.isEmail(userInfo.Email)) {
            return { error: 'Required field is missing' };
        }

        // Check if the email already exists
        const emailExists = await User.findOne({ where: { email: userInfo.Email } });
        if (emailExists && emailExists.is_active) {
            // If the email already exists, return an error
            return { error: 'User already exists' };
        }
        if (emailExists && !emailExists.is_active) {
            await User.update({ is_active: true }, { where: { email: userInfo.Email } });
            return { success: true };
        }

        // Check if the required fields are missing
        if (role === "Mentee") {
            if (isInvalid(userInfo['First Name']) || isInvalid(userInfo['Last Name']) || isInvalid(userInfo['University']) || isInvalid(userInfo['Date of Birth']) || isInvalid(userInfo['City'])) {
                // If any required field is missing, return an error
                return { error: 'Required field is missing' };
            }
        }
        else {
            if (isInvalid(userInfo['First Name']) || isInvalid(userInfo['Last Name']) || isInvalid(userInfo['Experience'])) {
                // If any required field is missing, return an error
                return { error: 'Required field is missing' };
            }
        }

        // generate a random password for each user
        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = await hash(password, 10);

        // create a transaction to add the user to the database, so that if any error occurs, the changes can be rolled back
        const t = await sequelize.transaction();
        // if the email is valid and does not exist, and all required fields are present, add the user to the database
        try {
            const newUser = await User.create({
                email: userInfo.Email,
                password: hashedPassword,
                role: role,
                is_active: true
            }, { transaction: t });

            // then add the user to the mentee or mentor table
            if (role === "Mentee") {
                await Mentee.create({
                    user_id: newUser.id,
                    first_name: userInfo['First Name'],
                    last_name: userInfo['Last Name'],
                    University: userInfo['University'],
                    dob: userInfo['Date of Birth'],
                    home_city: userInfo['City'],
                    team_id: null
                }, { transaction: t });
            }
            else {
                await Mentor.create({
                    user_id: newUser.id,
                    first_name: userInfo['First Name'],
                    last_name: userInfo['Last Name'],
                    Experience: userInfo['Experience'],
                    team_id: null
                }, { transaction: t });
            }
            await t.commit();
            await sendEmail(userInfo.Email, password);
        } catch (error) {
            await t.rollback();
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const sendEmail = (email, password) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.in",
            port: 465,
            secure: true, // use SSL
            auth: {
                user: EMAILUSER,
                pass: EMAILPASSWORD,
            },
        });
        const mailOptions = {
            from: "harsh@harshvse.in",
            to: req.body.email,
            subject: "Evolve Application Login Details",
            text: `To login to the evolve application your credentials are email: ${email} password: ${password}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                throw error
            }
        });
    } catch (error) {
        console.log("error in sending credentials for " + email);
    }
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

async function fetchTeamId(uid, role) {
    try {
        if (role === "Mentee") {
            const mentee = await Mentee.findOne({ where: { user_id: uid } });
            return mentee.team_id;
        }
        else {
            const mentor = await Mentor.findOne({ where: { user_id: uid } });
            return mentor.team_id;
        }
        // console.log("Team ID:", teamId);
    } catch (error) {
        // console.error(error);
        throw error;
    }
}





module.exports = {
    fetchMenteesByMentor,
    fetchMentorsByMentee,
    addUser,
    validateColumns,
    fetchTeamId
};