const { Mentor, User, Mentee, Attendance } = require('../models/');
const { insertBulkAttendance, checkDuplicateDate } = require('../services/attendance_services.js');
const { fetchMenteesByMentor } = require('../services/user_services.js');
const { fetchAttendanceByMentor, fetchAttendanceByMentee } = require('../services/attendance_services.js');


exports.fetchTeamData = async (req, res) => {
    try {
        if (req.user.role == "Mentor") {
            const mentorUid = req.user.id;
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
        const attendanceArray = Object.entries(attendanceData.attendance).map(([mentee_uid, attendance]) => ({
            mentor_user_id: attendanceData.mentor_uid,
            mentee_user_id: mentee_uid,
            date_of_meet: attendanceData.date,
            description: attendanceData.description,
            attendance: attendance
        }));
        if (!await checkDuplicateDate(attendanceData.mentor_uid, attendanceData.date)) {
            res.status(400).json({
                success: "failed",
                message: "Date meeting for this mentor already exists"
            })
        } else {
            const attendance = await insertBulkAttendance(attendanceArray);
            res.status(200).json(attendance);
        }
    } catch (error) {
        console.error('Error inserting attendance:', error);
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

exports.fetchAttendanceByMentorID = async (req, res) => {
    mentorUid = req.body.mentorID;
    try {

        const attendance = await fetchAttendanceByMentor(mentorUid);
        res.status(200).json(attendance);
    }
    catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getMentorName = async (req, res) => {
    try {
        const mentorUid = req.body.mentorId;
        const mentor = await Mentor.findOne({ where: { user_id: mentorUid } });
        res.status(200).json({
            success: true,
            data: mentor.first_name + " " + mentor.last_name,
        })
    } catch (erorr) {
        console.log("not working");
        res.status(400).json({
            success: false,
            data: "unauthorized",
        })
    }
}

exports.deleteAttendance = async (req, res) => {
    try {
        const meetings = req.body;
        console.log(meetings);
        // Check if meetings array is provided
        if (!meetings || !Array.isArray(meetings) || meetings.length === 0) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // Filter out invalid meeting objects
        const validMeetings = meetings.filter(
            (meeting) =>
                meeting.mentor_user_id && typeof meeting.mentor_user_id === 'number' && meeting.date_of_meet
        );

        // Delete attendance records for valid meetings
        const deletedAttendances = await Attendance.destroy({
            where: {
                mentor_user_id: validMeetings.map((meeting) => meeting.mentor_user_id),
                date_of_meet: validMeetings.map((meeting) => meeting.date_of_meet),
            },
        });

        res.json({ message: `Deleted ${deletedAttendances} attendance records` });
    } catch (error) {
        console.error('Error deleting attendances:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.updateAttendance = async (req, res) => {
    const { selectedAttendance, position } = req.body;

    try {
        // Loop through each attendance record in the selectedAttendance array
        for (const attendanceData of selectedAttendance) {
            const { mentor_user_id, date_of_meet, mentee_user_id } = attendanceData;

            // Find the attendance record based on mentor_user_id, date_of_meet, and mentee_user_id
            const existingAttendance = await Attendance.findOne({
                where: {
                    mentor_user_id,
                    date_of_meet,
                    mentee_user_id
                }
            });

            // If the attendance record exists, update the attendance status
            if (existingAttendance) {
                existingAttendance.attendance = position;
                await existingAttendance.save(); // Save the updated attendance record
            } else {
                // If the attendance record doesn't exist, create a new one with the provided data
                await Attendance.create({
                    mentor_user_id,
                    date_of_meet,
                    mentee_user_id,
                    attendance: position
                });
            }
        }

        // Respond with a success message
        return res.status(200).json({ message: 'Attendances updated successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error updating attendances:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
