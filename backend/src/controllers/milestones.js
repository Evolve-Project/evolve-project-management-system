const { MilestoneDescription, Milestone, Task } = require("../models");

exports.getMilestoneDesc = async (req, res) => {
  try {
    const milestone_desc = await MilestoneDescription.findAll({
      attributes: ["name", "description", "start_date", "end_date"],
    });

    console.log(milestone_desc);
    return res.json(milestone_desc);
  } catch (error) {
    console.log("Error in getMilestoneDesc, milestone controller ", error);
  }
};

exports.getTasksByMilestoneName = async (req, res) => {
  try {
    const { name } = req.body;

    console.log("Received milestone name:", name);

    const milestoneDesc = await MilestoneDescription.findOne({
      where: {
        name: name,
      },
    });

    console.log(
      "Milestone Description ID:",
      milestoneDesc ? milestoneDesc.id : null
    );

    if (!milestoneDesc) {
      // Handle the case where milestone description is not found
      return res.status(404).json({ error: "Milestone description not found" });
    }

    const milestone = await Milestone.findOne({
      where: {
        milestone_description_id: milestoneDesc.id,
      },
    });

    console.log("Milestone ID:", milestone ? milestone.id : null);

    if (!milestone) {
      // Handle the case where milestone is not found
      return res.status(404).json({ error: "Milestone not found" });
    }

    const tasks = await Task.findAll({
      where: {
        milestone_id: milestone.id,
      },
    });

    console.log(tasks);
    return res.json(tasks);
  } catch (error) {
    console.log("Error in getTasksByMilestoneName:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};