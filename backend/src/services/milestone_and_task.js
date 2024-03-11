'use strict';

const { Milestone, MilestoneDescription, Task ,Mentee} = require('../models');

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
        return tasks;
    } catch (error) {
        console.log("Error in getTasksByMilestoneId service:", error);
        throw error;
    }
};

async function getMilestonebyteamId(teamId) {
    try {
      const milestones = await Milestone.findAll({
        where: {
          team_id: teamId,
        },
      });
  
      // console.log("Milestone ID:", milestone ? milestone.id : null);
  
      if (!milestones) {
        // Handle the case where milestone is not found
        return res.status(404).json({ error: "Milestone not found" });
      }
  
      return milestones;
    } catch (error) {
      console.log("Error in getTasksByMilestoneId service:", error);
      throw error;
    }
  }
  
  async function getMenteebyteamId(teamId) {
    try {
      const mentees = await Mentee.findAll({
        where: {
          team_id: teamId,
        },
      });
  
      
  
      if (!mentees) {
        
        return res.status(404).json({ error: "Mentee not found" });
      }
  
      return mentees;
    } catch (error) {
      console.log("Error in getTasksByMilestoneId service:", error);
      throw error;
    }
  }

module.exports = {
    getMilestoneDesc,
    getTasksByMilestoneId,
    getMenteebyteamId,
    getMilestonebyteamId

};