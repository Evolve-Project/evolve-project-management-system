const { Milestone } = require('../src/models');
const { Router } = require("express");

const router = Router();
const { validationMiddleware } = require("../middlewares/validation-middleware");

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


router.get('/get-milestones', testGetMilestone);

module.exports = router

