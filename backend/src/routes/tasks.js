
const {
    validationMiddleware,
  } = require("../middlewares/validation-middleware");
  const { Router } = require("express");
  const { getTasksByMilestoneName} = require("../controllers/milestones");
  const router = Router();

router.get("/get-tasks", getTasksByMilestoneName);


module.exports = router; 