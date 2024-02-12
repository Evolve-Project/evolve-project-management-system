const { Router } = require("express");
const { getUsers, register, login, protected, logout, resetPassword, getUserByToken } = require("../controllers/auth");
const { registerValidation, loginValidation } = require("../validators/auth");
const { validationMiddleware } = require("../middlewares/validation-middleware");
const { userAuth } = require("../middlewares/passport-middleware");
const router = Router();

router.get('/get-users', getUsers);
router.get('/protected', userAuth, protected);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.post('/reset-password', resetPassword);
router.post('/get-user-by-token', getUserByToken);
router.get('/logout', logout);

module.exports = router