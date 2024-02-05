const {check} = require('express-validator');
const db = require('../db');
const {compare} = require('bcryptjs');

const password = check('password').isLength({min: 6, max: 15}).withMessage('password not the corrent length');

const email = check('email').isEmail().withMessage('Invalid Email');

const role = check('role').isString().withMessage('role missing');

const emailExists = check('email').custom(async (value)=>{
    const {rows} = await db.query('select * from users where email = $1', [value,])
    if(rows.length){
        throw new Error('Email Already Exists');
    }
})

const loginFieldsCheck = check('email').custom(async (value, {req}) => {
    const user = await db.query('select * from users where email = $1', [value])
    if(!user.rows.length){
        throw new Error('Email Does not exist');
    }

    const validpassword = await compare(req.body.password, user.rows[0].password);

    if(!validpassword){

        throw new Error("Invalid Password");
    }

    req.user= user.rows[0];
})

module.exports = {
    registerValidation: [email, password,role, emailExists],
    loginValidation: [loginFieldsCheck]
}