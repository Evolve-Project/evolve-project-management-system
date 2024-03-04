const { Mentor, User, Mentee } = require('../models/');
const { insertBulkAttendance } = require('../services/attendance_services.js');
const { fetchMenteesByMentor } = require('../services/user_services.js');
const { fetchAttendanceByMentor, fetchAttendanceByMentee } = require('../services/attendance_services.js');


exports.fetchTeamData = async (req, res) => {
    try {
        const mentorUid = req.user.id;
        console.log(req.body);
        const mentor = await Mentor.findOne({ where: { user_id: mentorUid } });
        const mentorTeamId = mentor.team_id;

        const result = await Mentee.findAll({
            where: { team_id: mentorTeamId },
            include: [
                {
                    model: User, // Include the User model
                    attributes: ['id', 'email']
                }
            ],
            attributes: ['first_name', 'last_name']
        });

        // Check if the result is not empty
        if (result.length > 0) {
            const menteeData = result.map(r => ({
                id: r.User.id, // Access User model using alias defined in association
                email: r.User.email, // Access User model using alias defined in association
                first_name: r.first_name,
                last_name: r.last_name
            }));
            res.status(200).json({ users: menteeData });
        } else {
            res.status(404).json({ message: "No mentees found for this mentor's team" });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching mentee data:', error);
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
        attendanceData.mentor_uid = req.user.id;
        console.log(attendanceData)
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


// fetch attendance for mentee or mentor
exports.fetchAttendance = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (req.user.role !== 'Mentor') {
            const menteeUid = req.user.id;
            const attendance = await fetchAttendanceByMentee(menteeUid);
            res.status(200).json(attendance);
        }
        else {
            const mentorUid = req.user.id;
            const attendance = await fetchAttendanceByMentor(mentorUid);
            res.status(200).json(attendance);
        }
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
