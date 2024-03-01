const Sequelize = require('sequelize');
const {
  FeedbackMetric,
  Team,
  Project,
  Mentor,
  Mentee,
  Feedback,
} = require("../models/");

const getTeamId = async (req, res) => {
    try{
        const user_id = req.user.id;
        const role = req.user.role;
        if(role === "Admin")
            res.status(404).json({message: "Admin does not have any team"});
        else if(role === "Mentor")
        {
            const mentor_record = await Mentor.findOne({
                where: {user_id}
            });
            const team_id = mentor_record.team_id;
            res.status(200).json({team_id});
        }
        else if(role === "Mentee")
        {
            const mentee_record = await Mentee.findOne({
                where: {user_id}
            });
            const team_id = mentee_record.team_id;
            res.status(200).json({team_id});
        }else{
            res.status(400).json({message: "Bad request"});
        }
    }catch(err){
        console.log("error in getTeamid: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getMetrics = async (req, res) => {
  try {
    const metrics = await FeedbackMetric.findAll({
      attributes: ["id", "metric_name", "role"],
    });
    
    // IF NOT EXITS 404 NOT FOUND

    res.status(200).json({ metrics });
  } catch (err) {
    console.log("error in getMetrics: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMentorMetrics = async (req, res) => {
  try {
    // console.log("user id : ",req.user.id);
    const mentor_metrics = await FeedbackMetric.findAll({
      where: { role: "Mentor" },
      attributes: ["id", "metric_name"],
    });
    
    // IF NOT EXITS 404 NOT FOUND

    res.status(200).json({ mentor_metrics });
  } catch (err) {
    console.log("error in getMentorMetrics: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMenteeMetrics = async (req, res) => {
  try {
    // console.log("user id : ",req.user.id);
    const mentee_metrics = await FeedbackMetric.findAll({
      where: { role: "Mentee" },
      attributes: ["id", "metric_name"],
    });
    
    // IF NOT EXITS 404 NOT FOUND

    res.status(200).json({ mentee_metrics });
  } catch (err) {
    console.log("error in getMenteeMetrics: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProjectDetails = async (req, res) => {
  try {
    const allTeamsNames = await Team.findAll({
      attributes: ["id", "project_id"],
      include: [
        {
          model: Project,
          require: true,
          attributes: ["name"],
        },
      ],
    });
    
    // IF NOT EXITS 404 NOT FOUND

    res.status(200).json({ allTeamsNames });
  } catch (err) {
    console.log("error in getAllProjectDetails: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMentors = async (req, res) => {
  try {
    // console.log(req.user);
    // console.log(req.params.team_id);
    // const req_team_id = await User
    const team_id = req.params.team_id;
    const allMentors = await Mentor.findAll({
      where: { team_id },
    });
    
    // IF NOT EXITS 404 NOT FOUND

    res.status(200).json({ allMentors });
  } catch (err) {
    console.log("error in getMentors: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMentees = async (req, res) => {
  try {
    // console.log(req.user.team_id);
    // console.log(req.params.team_id);
    const team_id = req.params.team_id;
    const allMentees = await Mentee.findAll({
      where: { team_id },
    });
    
    // IF NOT EXITS 404 NOT FOUND

    res.status(200).json({ allMentees });
  } catch (err) {
    console.log("error in getMentors: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllFeedbacksTo = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const allFeedbacks = await Feedback.findAll({
      where: { given_to_user_id: user_id },
    });
    
    // IF NOT EXITS 404 NOT FOUND

    res.status(200).json({ allFeedbacks });
  } catch (err) {
    console.log("error in getAllFeedbacksTo: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllFeedbacksGivenByUserTo = async (req, res) => {
  try {
    const given_by_user_id = req.user.id;
    // console.log("given by: ", given_by_user_id);
    const given_to_user_id = req.params.user_id;
    const allFeedbacks = await Feedback.findAll({
      where: { given_by_user_id, given_to_user_id },
    });

    // IF NOT EXITS 404 NOT FOUND

    res.status(200).json({ allFeedbacks });
  } catch (err) {
    console.log("error in getAllFeedbacksByUserTo: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAvgRating = async (req, res) => {
    try{
        const user_id = req.user.id;
        const avgRating = await Feedback.findAll({
            where: {given_by_user_id: user_id},
            attributes : ["given_to_user_id", [Sequelize.fn('AVG', Sequelize.col('rating')), 'average_rating']],
            group : ["given_by_user_id", "given_to_user_id"]
        });
        res.status(200).json({avgRating});
    }catch(err){
        console.log("error in getAvgRating: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const postFeedback = async (req, res) => {
  try {
    const given_by_user_id = req.user.id;
    const feedbacks = req.body;
    for (const key in feedbacks) {
      const feedback = feedbacks[key];
      const [record, created] = await Feedback.findOrCreate({
        where: {
          given_by_user_id,
          metric_id: feedback.metric_id,
          given_to_user_id: feedback.given_to_user_id,
        },
        defaults: { ...feedback, given_by_user_id },
      });
      if (created) {
        console.log("Record created successfully:", record.toJSON());
        // res.status(200).json({message:"Created new Feedback record"});
      } else {
        const updatedRecord = await record.update({
          ...feedback,
          given_by_user_id,
        });
        console.log("Record updated successfully:", updatedRecord.toJSON());
      }
    }
    res.status(200).json({ message: "Feedbacks updated successfully" });
  } catch (err) {
    console.log("error in postFeedback: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const add_metric = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      res.status(400).json({
        success: false,
        message: "UnAuthorized Request",
      });
    }
    else{
        const existingMetric = await FeedbackMetric.findOne({
          where: { metric_name: req.body.metric_name, role: req.body.role },
        });
        if (existingMetric) {
          // User already exists
          return res
            .status(409)
            .json({ status: "alreadyExists", message: "Metric already exists" });
        } else {
          // User doesn't exist, create a new record
          const newMetric = await FeedbackMetric.create(req.body);
          return res
            .status(201)
            .json({
              status: "created",
              message: "Metric created successfully",
              newMetric,
            });
        }
    }
  } catch (err) {
    console.log("error in add_metric: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const delete_metric = async (req, res) => {
    try{
        if (req.user.role !== "Admin") {
            res.status(400).json({
              success: false,
              message: "UnAuthorized Request",
            });
        }
        const metric_id = req.params.id;
        const metric_record = await FeedbackMetric.findOne({
            where: {id: metric_id}
        });
        //IF NOT EXITS ...............
        if(metric_record === null)
            res.status(404).json({message: "Metric record not Found"});
        else{
            // const del_metric = await FeedbackMetric.destroy({
            //     where: {id: metric_id}
            // });
            await metric_record.destroy();
            res.status(200).json({status: "deleted", message:"Metric Deleted successfully"});
        }
    }catch(err){
        console.log("error in delete_metric: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const update_metric = async (req, res) => {
    try{
        if (req.user.role !== "Admin") {
            res.status(400).json({
              success: false,
              message: "UnAuthorized Request",
            });
        }
        const metric_id = req.body.id;
        const metric_record = await FeedbackMetric.findOne({
            where : {id: metric_id}
        });
        if(metric_record === null)
        {
            res.status(404).json({status: "Not found",message: "Metric record not found"});
        }else{
            await metric_record.update({metric_name: req.body.metric_name});
            res.status(200).json({status: "Updated" ,message: "Metric updated successfully"});
        }
    }catch(err){
        console.log("error in update_metric: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
  getTeamId,
  getMetrics,
  getMentorMetrics,
  getMenteeMetrics,
  getAllProjectDetails,
  getMentors,
  getMentees,
  getAllFeedbacksTo,
  getAllFeedbacksGivenByUserTo,
  getAvgRating,
  postFeedback,
  add_metric,
  delete_metric,
  update_metric,
};
