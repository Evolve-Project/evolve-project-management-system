const { getTasksByMilestoneId, getMilestoneDesc } = require('../services/milestone_and_task');
const { fetchTeamId } = require('../services/user_services');

async function getTasks(req, res) {
  try {
    const { milestoneDescId } = req.body
    const uid = req.user.id;
    const teamId = await fetchTeamId(uid, "Mentor");
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

module.exports = {
  getTasks,
  getMilestones
};