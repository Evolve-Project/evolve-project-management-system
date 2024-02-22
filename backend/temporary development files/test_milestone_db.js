const { Milestone } = require('../src/models');

async function testGetMilestone() {
    try {
        const milestones = await Milestone.findAll({
            attributes: ['milestone_description_id', 'team_id','milestone_completion_datetime',
            'total_tasks']
        }); 

        console.log(milestones[0]);
    } catch (error) {
        console.log("Error in getMilestone, Milestone controller ", error);
    }
}


testGetMilestone();