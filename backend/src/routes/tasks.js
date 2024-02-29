
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const { userAuth } = require("../middlewares/passport-middleware");
const { Router } = require("express");
const { getTasks } = require("../controllers/milestones");
const router = Router();

router.post("/get-tasks", userAuth, getTasks);


module.exports = router; 