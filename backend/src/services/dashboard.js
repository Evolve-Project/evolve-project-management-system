// {
//     "id": 1,
//         "project_name": "Ventosanzap",
//             "mentor": "Chase Eyree",
//                 "mentor_satisfaction": 91,
//                     "mentee_satisfaction": 90,
//                         "Attendance": 90,
//                             "Progress": 7
// }

const { Project, Mentor, Mentee, User, Team, Feedback, Milestone, Attendance } = require('../models');
const Sequelize = require('sequelize');

// send admin dashboard data
async function sendAdminDashboardData() {
    try {

        // calculate progress for each team
        const progress = await Milestone.findAll({
            attributes: [
                'team_id',
                [Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN status = true THEN 1 END')), 'completed_milestones']
            ],
            group: ['team_id']
        });

        // Calculate progress for each team
        for (const team of progress) {
            team.dataValues.progress = (team.dataValues.completed_milestones / 6) * 100;
        }

        // calculate average attendance for each team
        const averageAttendance = await Attendance.findAll({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.literal('CASE WHEN attendance = \'Absent\' THEN 0 ELSE 1 END')), 'average_attendance'],
                [Sequelize.literal('"User->Mentee"."team_id"'), 'team_id']
            ],
            include: [
                {
                    model: User,
                    attributes: [],
                    include: [
                        {
                            model: Mentee,
                            attributes: []
                        }
                    ]
                }
            ],
            group: ['User.Mentee.team_id']
        });

        // calculate average ratings for each mentor 
        const mentorAverageRatings = await Feedback.findAll({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('rating')), 'average_rating'],
                [Sequelize.literal('"User->Mentor"."team_id"'), 'team_id']
            ],
            include: [
                {
                    model: User,
                    attributes: [],
                    where: { role: 'mentor' },
                    include: [
                        {
                            model: Mentor,
                            attributes: []
                        }
                    ]
                }
            ],
            group: ['User.role', 'User.Mentor.team_id']
        });

        // calculate average ratings for each mentee
        const menteeAverageRatings = await Feedback.findAll({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('rating')), 'average_rating'],
                [Sequelize.literal('"User->Mentee"."team_id"'), 'team_id']
            ],
            include: [
                {
                    model: User,
                    attributes: [],
                    where: { role: 'mentee' },
                    include: [
                        {
                            model: Mentee,
                            attributes: []
                        }
                    ]
                }
            ],
            group: ['User.role', 'User.Mentee.team_id']
        });


        //fetch team ids and project ids
        const teams = (await Team.findAll({
            attributes: ['id', 'project_id']
        })).map(instance => instance.toJSON());

        // find all mentors in a team and put them in a comma separated string and append to the team object
        for (const team of teams) {
            const mentors = await Mentor.findAll(
                {
                    where: { team_id: team.id },
                    attributes: ['first_name', 'last_name']
                }
            )
            team.mentors = mentors.map(mentor => `${mentor.first_name} ${mentor.last_name}`).join(', ');
        }

        // get average feedback scores for each mentor and mentee and append separately to the team object
        for (const team of teams) {
            const mentorFeedback = mentorAverageRatings.find(rating => rating.User.Mentor.team_id === team.id);
            team.mentor_satisfaction = mentorFeedback ? mentorFeedback.dataValues.average_rating : 0;

            const menteeFeedback = menteeAverageRatings.find(rating => rating.User.Mentee.team_id === team.id);
            team.mentee_satisfaction = menteeFeedback ? menteeFeedback.dataValues.average_rating : 0;
        }

        // get project names and append to the team object
        for (const team of teams) {
            const project = await Project.findByPk(team.project_id);
            team.project_name = project.name;
        }

        // get average attendance for each team and append to the team object
        for (const team of teams) {
            const attendance = averageAttendance.find(attendance => attendance.Mentee.team_id === team.id);
            team.attendance = attendance ? attendance.dataValues.average_attendance : 0;
        }
        // get progress for each team and append to the team object
        for (const team of teams) {
            const teamProgress = progress.find(p => p.team_id === team.id);
            team.progress = teamProgress ? teamProgress.progress : 0;
        }

        return teams;

    } catch (error) {
        // res.status(500).json({ success: false, error: error.message });
        console.error(error);
    }
}

// sendAdminDashboardData().then(data => console.log(data)).catch(error => console.error(error));


// send total counts
async function getTotalCountsService() {
    try {
        const totalProjects = await Project.count();
        const totalMentors = await Mentor.count();
        const totalMentees = await Mentee.count();

        return {
            totalProjects,
            totalMentors,
            totalMentees
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}


// send user management table info
async function getUsersWithRolesAndProjects() {
    try {
        const mentees = await User.findAll({
            attributes: ['name', 'role'],
            include: [
                {
                    model: Mentee,
                    attributes: [],
                    include: [
                        {
                            model: Team,
                            attributes: [],
                            include: [
                                {
                                    model: Project,
                                    attributes: [['name', 'project_name']]
                                }
                            ]

                        }
                    ]
                }
            ]
        });


        const mentors = await User.findAll({
            attributes: ['name', 'role'],
            include: [
                {
                    model: Mentor,
                    attributes: [],
                    include: [
                        {
                            model: Team,
                            attributes: [],
                            include: [
                                {
                                    model: Project,
                                    attributes: [['name', 'project_name']]
                                }
                            ]

                        }
                    ]
                }
            ]
        });

        return {
            mentors,
            mentees
        };
    } catch (error) {
        console.error("Error in getUsersWithRolesAndProjects", error);
        throw error;
    }
}



module.exports = {
    sendAdminDashboardData,
    getTotalCountsService,
    getUsersWithRolesAndProjects
}