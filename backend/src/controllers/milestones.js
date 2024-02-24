const { MilestoneDescription ,Milestone} = require("../models");

exports.getMilestoneDesc = async (req, res) => {
  try {
    const milestone_desc = await MilestoneDescription.findAll({
      attributes: ["name", "description", "start_date", "end_date"],
    });

    console.log(milestone_desc);
   return  res.json(milestone_desc);
   
  } catch (error) {
    console.log("Error in getMilestoneDesc, auth controller ", error);
  }
};


