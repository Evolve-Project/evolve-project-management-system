const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const { Router } = require("express");
const { getMilestoneDesc,getTasksByMilestoneName} = require("../controllers/milestones");
const router = Router();
router.get("/get-milestones", getMilestoneDesc);
router.post("/send-milestone", getTasksByMilestoneName);
module.exports = router;
