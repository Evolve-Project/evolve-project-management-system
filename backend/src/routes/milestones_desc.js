const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const { Router } = require("express");
const { getMilestoneDesc } = require("../controllers/milestones");
const router = Router();
router.get("/get-milestones", getMilestoneDesc);
module.exports = router;
