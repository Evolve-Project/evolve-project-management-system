const { Router } = require("express");
const { userAuth } = require("../middlewares/passport-middleware");
const { createAttendance, fetchTeamData } = require("../controllers/attendance");

const router = Router();

router.post('/createAttendance', userAuth, createAttendance);
router.get('/getMentees', userAuth, fetchTeamData);
module.exports = router