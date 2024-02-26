const { Mentor, User, Mentee } = require('../models/');


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