const { Router } = require("express");
const {
  teamidToMentee,
  teamidToMentor,
  addSingleUser,
  removeid,
  assignProject,
  mentorDetails,
} = require("../controllers/user");

const { userAuth } = require("../middlewares/passport-middleware");

const router = Router();

router.get("/teamidToMentee", userAuth, teamidToMentee);
router.get("/teamidToMentor", userAuth, teamidToMentor);
router.get("/addSingleUser", userAuth, addSingleUser);
router.get("/removeid", userAuth, removeid);
router.get("/mentorDetails", userAuth, mentorDetails);

router.post("/assignProject", userAuth, assignProject);

module.exports = router;
