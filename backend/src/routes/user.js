const { Router } = require("express");
const { addUserInTable } = require("../controllers/user");

const { userAuth } = require("../middlewares/passport-middleware");

const router = Router();

router.get("/addUserInTable", userAuth, addUserInTable);

module.exports = router;
