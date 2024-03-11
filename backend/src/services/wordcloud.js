// backend/src/services/feedback_services.js

// potential stopwords library
// const { removeStopwords } = require('stopword')
// const oldString = 'a really Interesting string with some words'.split(' ')
// const newString = removeStopwords(oldString)
// // newString is now [ 'really', 'Interesting', 'string', 'words' ]





const { Feedback, User, Mentee, Mentor } = require('../models');

async function fetchTeamReviews(teamId) {
    try {
        // Fetch all mentees in the team
        const mentees = await Mentee.findAll({
            where: { team_id: teamId },
            attributes: ['user_id']
        });
        const menteeUserIds = mentees.map(mentee => mentee.user_id);

        // Fetch all mentors in the team
        const mentors = await Mentor.findAll({
            where: { team_id: teamId },
            attributes: ['user_id']
        });
        const mentorUserIds = mentors.map(mentor => mentor.user_id);

        // Combine mentee and mentor user ids
        const teamUserIds = [...menteeUserIds, ...mentorUserIds];

        // Fetch all feedbacks given to the team users
        const feedbacks = await Feedback.findAll({
            where: { given_to_user_id: teamUserIds },
            attributes: ['review']
        });

        return feedbacks;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { fetchTeamReviews };