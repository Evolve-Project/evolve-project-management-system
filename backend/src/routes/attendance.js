const { Router } = require("express");
const { userAuth } = require("../middlewares/passport-middleware");
const { createAttendance, fetchTeamData, insertAttendance } = require("../controllers/attendance");

const router = Router();

router.post('/createAttendance', userAuth, insertAttendance);
router.get('/getMentees', userAuth, fetchTeamData);
module.exports = router