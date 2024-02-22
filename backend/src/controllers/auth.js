var passwordValidator = require('password-validator');
const { hash } = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');
const { SECRET, EMAILUSER, EMAILPASSWORD } = require('../constants');
const { User } = require('../models/');
const nodemailer = require('nodemailer');

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

exports.getUserByToken = async (req, res) => {
    const token = req.body.token;
    console.log(token)
    verify(token, SECRET, (error, decodedData) => {
        return res.status(200).json({
            email: decodedData.email,
        })
    })

}

exports.requestResetPassword = async (req, res) => {
    let payload = {
        email: req.body.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 10),
    }
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: EMAILUSER,
                pass: EMAILPASSWORD,
            }
        });
        const token = sign(payload, SECRET)
        const mailOptions = {
            from: 'harsh@harshvse.in',
            to: req.body.email,
            subject: 'Password Reset',
            text: `To reset your password, please click on the following link: http://localhost:3000/reset-password/${token}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error sending email' });
            }
        })
        return res.status(200).json({
            success: true,
            message: 'Reset link sent successful',
        })

    } catch (error) {
        console.log('error in resetting password');
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const decoded = await verify(req.body.token, SECRET);
        var schema = new passwordValidator();
        schema
            .is().min(8)
            .is().max(24)
            .has().uppercase()
            .has().lowercase();
        if (schema.validate(req.body.password)) {
            const hashedPassword = await hash(req.body.password, 10);
            const user = await User.findOne({ where: { email: decoded.email } });
            if (user) {
                user.update({ password: hashedPassword })
            }
            return res.status(200).json({
                success: true,
                email: decoded.email,
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Password Too Weak",
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }

}