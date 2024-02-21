const express = require('express');
const router = express.Router();
const { addOneUser, addBulkUsers } = require('../controllers/register_users');

// Route to add a single user
router.post('/add-user', addOneUser);

// Route to add bulk users from an Excel file
router.post('/add-bulk-users', addBulkUsers);

module.exports = router;