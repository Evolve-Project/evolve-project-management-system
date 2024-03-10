const { getTotalCountsService } = require('../services/dashboard');
const { getUsersWithRolesAndProjects } = require('../services/dashboard');




// admin dashboard

// {
//     "id": 1,
//         "project_name": "Ventosanzap",
//             "mentor": "Chase Eyree",
//                 "mentor_satisfaction": 91,
//                     "mentee_satisfaction": 90,
//                         "Attendance": 90,
//                             "Progress": 7
// }


// total number of projects, mentee, mentor


async function getTotalCounts(req, res) {
    try {
        const counts = await getTotalCountsService();
        res.json({
            success: true,
            data: counts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the counts.'
        });
    }
}


// user management table info


async function getUserManagementTable(req, res) {
    try {
        const { mentors, mentees } = await getUsersWithRolesAndProjects();
        res.json({
            success: true,
            mentors: mentors,
            mentees: mentees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the users with roles and projects.'
        });
    }
}

module.exports = {
    getTotalCounts,
    getUserManagementTable
};