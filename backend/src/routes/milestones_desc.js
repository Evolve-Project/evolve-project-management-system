const { validationMiddleware, } = require("../middlewares/validation-middleware");
const { Router } = require("express");
const {
  getMilestones,
  getTasks
} = require("../controllers/milestones");
const router = Router();
router.get("/get-milestones", getMilestones);

module.exports = router;
