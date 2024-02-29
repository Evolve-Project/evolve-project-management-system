
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const { Router } = require("express");
const { getTasks } = require("../controllers/milestones");
const router = Router();

router.post("/get-tasks", getTasks);


module.exports = router; 