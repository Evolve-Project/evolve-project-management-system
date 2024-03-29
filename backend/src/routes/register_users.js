const express = require('express');
const { userAuth } = require("../middlewares/passport-middleware");
const router = express.Router();
const { addOneUser, addBulkUsers } = require('../controllers/register_users');
const { upload } = require("../middlewares/multer-middleware");

// Route to add a single user
router.post('/add-user', userAuth, addOneUser);

// Route to add bulk users from an Excel file
router.post('/add-bulk-users', upload, userAuth, addBulkUsers);

module.exports = router;