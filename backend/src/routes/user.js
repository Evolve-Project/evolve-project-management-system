const { Router } = require("express");
const {
  teamidToMentee,
  teamidToMentor,
  addSingleUser,
  removeid,
  assignProject,
  mentorDetails,
  createQuery,
  allQuery,
  menteeDetails,
  updateMentor,
  updateMentee,
} = require("../controllers/user");

const { userAuth } = require("../middlewares/passport-middleware");

const router = Router();

router.get("/teamidToMentee", userAuth, teamidToMentee);
router.get("/teamidToMentor", userAuth, teamidToMentor);

router.post("/addSingleUser", userAuth, addSingleUser);

router.get("/removeid", userAuth, removeid);
router.get("/mentorDetails", userAuth, mentorDetails);
router.get("/menteeDetails", userAuth, menteeDetails);
router.post("/updateMentor", userAuth, updateMentor);
router.post("/updateMentee", userAuth, updateMentee);


router.post("/createQuery", userAuth, createQuery);
router.get("/allQuery", userAuth, allQuery);


router.post("/assignProject", userAuth, assignProject);

module.exports = router;
