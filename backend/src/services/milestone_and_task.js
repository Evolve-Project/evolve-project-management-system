'use strict';

const { Milestone, MilestoneDescription, Task } = require('../models');

async function getMilestoneDesc() {
    try {
        const milestone_desc = await MilestoneDescription.findAll();
        // console.log(milestone_desc);
        return milestone_desc;
    } catch (error) {
        // console.log("Error in getMilestoneDesc", error);
        throw error;
    }
};

async function getTasksByMilestoneId(milestoneDescId, teamId) {
    try {

        const milestone = await Milestone.findOne({
            where: {
                milestone_description_id: milestoneDescId,
                team_id: teamId
            },
        });

        // console.log("Milestone ID:", milestone ? milestone.id : null);

        if (!milestone) {
            // Handle the case where milestone is not found
            return res.status(404).json({ error: "Milestone not found" });
        }

        const tasks = await Task.findAll({
            where: {
                milestone_id: milestone.id,
            },
        });

        // console.log(tasks);
        return res.json(tasks);
    } catch (error) {
        console.log("Error in getTasksByMilestoneId service:", error);
        throw error;
    }
};

module.exports = {
    getMilestoneDesc,
    getTasksByMilestoneId
};