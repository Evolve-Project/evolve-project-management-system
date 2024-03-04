const { validationMiddleware, } = require("../middlewares/validation-middleware");
const { userAuth } = require("../middlewares/passport-middleware");
const { Router } = require("express");
const {
  getMilestones,
  getTasks
} = require("../controllers/milestones");
const router = Router();
router.get("/get-milestones", userAuth, getMilestones);

module.exports = router;
