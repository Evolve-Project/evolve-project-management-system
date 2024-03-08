
const { Attendance, Mentor, Mentee } = require('../models/');

exports.insertBulkAttendance = async (dataArray) => {
    try {
        const attendances = await Attendance.bulkCreate(dataArray);
        return attendances;
    } catch (error) {
        throw error;
    }
};

exports.checkDuplicateDate = async (mentor_uid, date) => {
    const existingRecord = await Attendance.findOne({
        where: {
            mentor_user_id: mentor_uid,
            date_of_meet: date
        }
    });

    if (existingRecord) {
        // A record with the same mentor_uid and date already exists
        console.log('Record already exists');
        return false
    } else {
        // No existing record found, you can proceed to create a new one
        console.log('No existing record, you can create a new one')
        return true
    }
}



// fetch attendance of all the mentees having same team id as the mentor
exports.fetchAttendanceByMentor = async (mentorUid) => {
    try {
        // Fetch the team id of the mentor
        const mentor = await Mentor.findOne({ where: { user_id: mentorUid } });
        const mentorTeamId = mentor.team_id;
        // Fetch the mentees of the mentor
        const mentees = await Mentee.findAll({
            where: { team_id: mentorTeamId },
            attributes: ['user_id']
        });

        // Extract the user ids of the mentees
        const menteeIds = mentees.map(mentee => mentee.user_id);

        // Fetch the attendance of the mentees in the team
        const attendance = await Attendance.findAll({
            where: {
                mentee_user_id: menteeIds
            }
        });
        return attendance;

    } catch (error) {
        throw error;
    }
};


// fetch all attendances of the mentee based on mentee id
exports.fetchAttendanceByMentee = async (menteeUid) => {
    try {
        const attendances = await Attendance.findAll({
            where: { mentee_user_id: menteeUid }
        });
        return attendances;
    } catch (error) {
        throw error;
    }
};