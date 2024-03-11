const { validationMiddleware, } = require("../middlewares/validation-middleware");
const { userAuth } = require("../middlewares/passport-middleware");
const { Router } = require("express");
const {
  getMilestones,
  getTasks,
  getMenteesbyId,
  getMilestonesForStatus
} = require("../controllers/milestones");
const router = Router();
router.get("/get-milestones", userAuth, getMilestones);
router.get("/get-milestonesForStatus", userAuth, getMilestonesForStatus);
router.get("/get-menteesbyId", userAuth,  getMenteesbyId);

module.exports = router;
