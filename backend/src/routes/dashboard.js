// routes for dashboard
const express = require('express');
const { userAuth } = require("../middlewares/passport-middleware");
const router = express.Router();
const { getTotalCounts, getUserManagementTable } = require('../controllers/dashboard');

// Route to get total counts
router.get('/total-counts', userAuth, getTotalCounts);

// Route to get user management table info
router.get('/user-management-table', userAuth, getUserManagementTable);

module.exports = router;