const { check } = require('express-validator');
const { compare } = require('bcryptjs');
const { User } = require('../models/');

const password = check('password').isLength({ min: 6, max: 15 }).withMessage('password not the corrent length');

const email = check('email').isEmail().withMessage('Invalid Email');

const role = check('role').isString().withMessage('role missing');

const emailExists = check('email').custom(async (value) => {
    const user = await User.findOne({ where: { email: value } });
    if (user) {
        throw new Error('Email Already Exists');
    }
});

const loginFieldsCheck = check('email').custom(async (value, { req }) => {
    const user = await User.findOne({ where: { email: value } });
    if (!user) {
        throw new Error('Email Does not exist');
    }

    const validpassword = await compare(req.body.password, user.password);

    if (!validpassword) {
        throw new Error("Invalid Password");
    }

    req.user = user;
    console.log(req.user);
})

module.exports = {
    registerValidation: [email, password, role, emailExists],
    loginValidation: [loginFieldsCheck]
}