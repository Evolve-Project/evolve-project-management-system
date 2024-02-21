const { Router } = require("express");
const { getMilestone, addMilestone } = require("../controllers/milestones");

const router = Router();
const { validationMiddleware } = require("../middlewares/validation-middleware");

router.get('/get-milestones', getMilestone);

module.exports = router

