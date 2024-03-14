const {
  getTasksByMilestoneId,
  getMilestoneDesc,
  getMenteebyteamId,
  getMilestonebyteamId
} = require("../services/milestone_and_task");
const { fetchTeamId } = require("../services/user_services");
const { Milestone, Mentee } = require("../models");




const updateMilestoneStatus = async (req, res) => {
  const { milestoneId, newStatus } = req.body; // Ensure consistent naming with the frontend payload
  console.log(milestoneId); // Check if milestoneId is correctly received
  console.log(newStatus); 
  try {
    // Update the task status in the database
    const [rowsAffected, [updatedMilestone]] = await Milestone.update(
      { status: newStatus },
      { where: { id: milestoneId }, returning: true }
    );

    // Check if the task was updated successfully
    if (rowsAffected === 0) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    // Return the updated task
    return res.json(updatedMilestone);
  } catch (error) {
    // Handle any errors and send a 500 error response
    console.error('Error updating Milestone status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

async function getTasks(req, res) {
  try {
    const { milestoneDescId } = req.body;
    // console.log("request body:", req.body);
    const teamId = await fetchTeamId(req.user.id, req.user.role);
    // console.log("Team ID:", teamId);
    // console.log("Milestone Desc ID:", milestoneDescId);
    const tasks = await getTasksByMilestoneId(milestoneDescId, teamId);

    return res.json(tasks);
  } catch (error) {
    console.log("Error in getTasksByMilestoneId controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getMilestones(req, res) {
  try {
    const milestone_desc = await getMilestoneDesc(res);
    return res.json(milestone_desc);
  } catch (error) {
    console.log("Error in getMilestoneDesc", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getMilestonesForStatus(req, res) {
  try {
    const teamId = await fetchTeamId(req.user.id, req.user.role);
    const milestone = await getMilestonebyteamId(teamId);
    return res.json(milestone);
  } catch (error) {
    console.log("Error in getMilestonesForStatus", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getMenteesbyId(req, res) {
  try {
    const teamId = await fetchTeamId(req.user.id, req.user.role);
    const mentees = await  getMenteebyteamId(teamId);
    return res.json(mentees);
    
  } catch (error) {
    console.log("Error in getMenteesbyId", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getTasks,
  getMilestones,
  getMilestonesForStatus,
  getMenteesbyId,
  updateMilestoneStatus
};
