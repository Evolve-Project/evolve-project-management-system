
const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { SECRET } = require('../constants');
const { User } = require('../models/');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'email', 'role']
        });

        console.log(users);
        return res.status(200).json({
            success: true,
            users: users,
        });
    } catch (error) {
        console.log("Error in getUsers, auth controller ", error);
    }
};

exports.register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const hashedPassword = await hash(password, 10);

        await User.create({
            email: email,
            password: hashedPassword,
            role: role,
            is_active: true
        });

        return res.status(201).json({
            success: true,
            message: 'register complete',
        });

    } catch (error) {
        console.log("Error in registering user, auth controller ", error);
        return res.status(500).json({
            error: error.message
        });
    }
};


exports.login = async (req, res) => {
    let user = req.user;
    let payload = {
        id: user.id,
        email: user.email,
    }

    try {
        const token = sign(payload, SECRET)

        return res.status(200).cookie('token', token, { httpOnly: true }).json({
            success: true,
            message: 'login successful',
            role: req.user.role
        })

    } catch (error) {
        console.log("Error in register, auth controller ", error);
        return res.status(500).json({
            error: error.message
        })
    }
};


exports.protected = async (req, res) => {
    try {
        console.log(req.user);
        return res.status(200).json({
            info: "protected info",
        })
    } catch (error) {
        console.log("Error in protected, auth controller ", error);
    }
};

exports.logout = async (req, res) => {
    try {
        return res.status(200).clearCookie('token').json({
            success: true,
            message: 'Logout successful',

        })
    } catch (error) {
        console.log("Error in getUsers, auth controller ", error);
    }
}