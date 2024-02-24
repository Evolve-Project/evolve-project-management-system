'use strict';

const { Milestone, MilestoneDescription } = require('../models');

async function getAllMilestones() {
    try {
        const milestones = await Milestone.findAll({
            attributes: ['milestone_description_id', 'team_id', 'milestone_completion_datetime', 'total_tasks']
        });

        return milestones;
    } catch (error) {
        console.error("Error in getAllMilestones, Milestone service ", error);
        throw error;
    }
};

