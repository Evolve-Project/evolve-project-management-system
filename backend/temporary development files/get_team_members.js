// temporary file, delete after use
// a way to fetch team mentee details asscoiated with a mentor for attendance taking
const { Mentor, User, Mentee } = require('../src/models');

async function fetchTeamData(mentorUid) {
    const mentor = await Mentor.findOne({ where: { user_id: mentorUid } });
    console.log(mentor); // works till here

    // will throw error here for now because the team_id is set to null in the db
    const mentorTeamId = mentor.team_id;

    const result = await Mentee.findAll({
        where: { team_id: mentorTeamId },
        include: [
            {
                model: User,
                attributes: ['id', 'email'],
            }
        ],
        attributes: ['first_name', 'last_name']
    });

    return result.map(r => ({
        id: r.user.id,
        email: r.user.email,
        first_name: r.first_name,
        last_name: r.last_name
    }));
}

console.log(fetchTeamData(57));