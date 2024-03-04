
const { Attendance } = require('../models/');

exports.insertBulkAttendance = async (dataArray) => {
    try {
        const attendances = await Attendance.bulkCreate(dataArray);
        return attendances;
    } catch (error) {
        throw error;
    }
};