const { Mentor, User, Mentee } = require('../models/');
const { insertBulkAttendance } = require('../services/attendance_services.js');
const { fetchMenteesByMentor } = require('../services/user_services.js');

exports.createAttendance = async (req, res) => {
    console.log(req.body)
    console.log(req.user.role)
    console.log("called");
    if (req.user.role != "Mentor") {
        res.status(400).json({
            success: false,
            message: "UnAuthorized Request"
        })
    } else {
        console.log(req.body)
        res.status(200).json({
            success: true,
            message: "attendance created successfully"
        })
    }

}

exports.fetchTeamData = async (req, res) => {
    try {
        const mentorUid = req.user.id;
        const teamData = await fetchMenteesByMentor(mentorUid);
        res.status(200).json({ mentees: teamData });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// {
//     mentor_uid: 1,
//             description: "Project meeting",
//                 date: new Date("2024-02-22"),
//                     attendance: {
//         1: Present,
//             2: Present,
//                 3: Absent,
//                     4: Permitted
//     }

// },


exports.insertAttendance = async (req, res) => {
    try {
        const attendanceData = req.body;
        const attendanceArray = Object.entries(attendanceData.attendance).map(([mentee_uid, attendance]) => ({
            mentor_user_id: attendanceData.mentor_uid,
            mentee_user_id: mentee_uid,
            date_of_meet: attendanceData.date,
            description: attendanceData.description,
            attendance: attendance
        }));
        console.log(attendanceArray);
        const attendance = await insertBulkAttendance(attendanceArray);
        res.status(200).json(attendance);
    } catch (error) {
        console.error('Error inserting attendance:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

