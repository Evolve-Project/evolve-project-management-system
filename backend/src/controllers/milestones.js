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

    // Perform any necessary actions with the milestone name

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

    const milestone = await Milestone.findOne({
      where: {
        milestone_description_id: milestoneDesc.id,
      },
    });

    console.log("Milestone ID:", milestone ? milestone.id : null);

    const tasks = await Task.findAll({
      where: {
        milestone_id: milestone.id,
      },
    });

    console.log(tasks);
  } catch (error) {
    console.log("Error in getMilestoneName, milestone controller ", error);
  }
  // Send a response back to the client
};
