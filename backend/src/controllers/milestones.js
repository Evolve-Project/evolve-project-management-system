const { Milestone } = require('../models');

exports.getMilestone = async (req, res) => {
    try {
        const milestone = await Milestone.findAll({
            attributes: ['milestone_description_id', 'team_id','milestone_completion_datetime',
            'total_tasks']
        }); 

        console.log(milestone);
        return res.status(200).json({
            success: true,
            
        });
    } catch (error) {
        console.log("Error in getMilestone, Milestone controller ", error);
    }
};


exports.addMilestone = async (req, res) => {
    const { milestone_description_id, team_id,milestone_completion_datetime,total_tasks } = req.body;
    try {
       

        await Milestone.create({
            milestone_description_id: milestone_description_id,
            team_id:  team_id,
            milestone_completion_datetime: milestone_completion_datetime,
            total_tasks : total_tasks
        });

        return res.status(201).json({
            success: true,
            message: 'data inserted',
        });

    } catch (error) {
        console.log("Error in addMilestone , Milestone controller ", error);
        return res.status(500).json({
            error: error.message
        });
    }
};