const { Router } = require("express");
const { userAuth } = require("../middlewares/passport-middleware");
const { fetchTeamData, insertAttendance, fetchAttendance, getMentorName, deleteAttendance, updateAttendance } = require("../controllers/attendance");

const router = Router();

router.post('/createAttendance', userAuth, insertAttendance);
router.get('/getMentees', userAuth, fetchTeamData);
router.get('/getAttendance', userAuth, fetchAttendance);
router.post('/updateAttendance', userAuth, updateAttendance);
router.post('/getMentorName', getMentorName);
router.post('/deleteAttendance', deleteAttendance);
module.exports = router