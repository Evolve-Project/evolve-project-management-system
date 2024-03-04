const { Router } = require("express");
const { userAuth } = require("../middlewares/passport-middleware");
const { fetchTeamData, insertAttendance, fetchAttendance } = require("../controllers/attendance");

const router = Router();

router.post('/createAttendance', userAuth, insertAttendance);
router.get('/getMentees', userAuth, fetchTeamData);
router.get('/getAttendance', userAuth, fetchAttendance);

module.exports = router