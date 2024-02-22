const { User } = require("../models/");

exports.addUserInTable = async (req, res) => {
  try {
    console.log(req.user.id);
    const users = await User.findAll({
      where: {
        role: "Mentor",
      },
    });

    return res.status(200).json({
      message: "ok",
      users: users,
    });
  } catch (error) {
    console.log("Error in protected, auth controller ", error);
  }
};
