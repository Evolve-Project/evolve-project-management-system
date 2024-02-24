const { Router } = require("express");
const { userAuth } = require("../middlewares/passport-middleware");
const { createAttendance } = require("../controllers/attendance");

const router = Router();

router.post('/createAttendance', userAuth, createAttendance);

module.exports = router