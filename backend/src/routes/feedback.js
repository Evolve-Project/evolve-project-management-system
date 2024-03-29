const { Router } = require("express");
const { userAuth } = require("../middlewares/passport-middleware");
const {
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
} = require("../controllers/feedback");

// wordcloud
const { getFeedbackWords } = require("../controllers/wordcloud");

const router = Router();

router.get('/getTeamId', userAuth, getTeamId);
router.get("/feedback_metrics", userAuth, getMetrics);
router.get("/mentor_metrics", userAuth, getMentorMetrics);
router.get("/mentee_metrics", userAuth, getMenteeMetrics);
router.get("/project_details", userAuth, getAllProjectDetails);
router.get("/getMentors/:team_id", userAuth, getMentors);
router.get("/getMentees/:team_id", userAuth, getMentees);
router.get("/getAllFeedbacksTo/:user_id", userAuth, getAllFeedbacksTo); // SATISFACTION PAGE
router.get("/getAllFeedbacksByUserTo/:user_id", userAuth, getAllFeedbacksGivenByUserTo); // FEEDBACK PAGE
router.get("/getAvgRatingByUser", userAuth, getAvgRating);
router.post("/feedback", userAuth, postFeedback);

router.post("/add_metric", userAuth, add_metric);
router.delete("/delete_metric/:id", userAuth, delete_metric);
router.put("/update_metric", userAuth, update_metric);


//wordcloud
router.post('/feedbackWords', userAuth, getFeedbackWords);

module.exports = router;
