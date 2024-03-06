const { hash } = require("bcryptjs");
const {
  Mentee,
  Team,
  Mentor,
  Project,
  Query,
  Sequelize,
  User,
} = require("../models/");

const { Op } = Sequelize;

exports.teamidToMentee = async (req, res) => {
  try {
    console.log(req.user.role);
    if (req.user.role !== "Admin") {
      return res.status(400).json({
        message: "Only Admin can access",
      });
    }
    const teams = await Team.findAll();
    if (teams.length) {
      return res.status(400).json({
        message: "Add all students manually.",
      });
    }
    const listOfUser = await Mentee.findAll({
      where: { team_id: null },
      order: [["University", "ASC"]],
    });

    if (listOfUser.length == 0) {
      return res.status(400).json({
        message: "Teams are already created",
      });
    }

    const length = listOfUser.length; // 50
    const NoOfTeam = Math.floor(length / 5);

    if (NoOfTeam == 0) {
      return res.status(400).json({
        message: "Please upload more then 5 mentee",
      });
    }

    //Create teams
    let list = [];
    for (let i = 0; i < NoOfTeam; i++) {
      list.push({
        team_name: `Team ${i + 1}`,
        total_team_members: 5,
      });
    }

    const createdTeams = await Team.bulkCreate(list);
    // console.log(createdTeams);
    // const createdTeams = await Team.findAll();
    // console.log(createdTeams[0].dataValues);

    //Assign team id to mentee
    for (let i = 0; i < NoOfTeam * 5; i += NoOfTeam) {
      for (let j = 0; j < NoOfTeam; j++) {
        const student = listOfUser[i + j];
        await Mentee.update(
          { team_id: createdTeams[j].dataValues.id },
          {
            where: { user_id: student.user_id },
          }
        );
      }
    }

    // Assign what are left
    let leftUser;
    const reminder = length % 5;
    if (reminder) {
      leftUser = await Mentee.findAll({
        where: { team_id: null },
        order: [["University", "ASC"]],
      });

      let one = 0;
      for (let i = 0; i < leftUser.length; i++) {
        const student = leftUser[i];
        await Mentee.update(
          { team_id: createdTeams[one].dataValues.id },
          { where: { id: student.id } }
        );
        await Team.update(
          {
            total_team_members:
              createdTeams[one].dataValues.total_team_members + 1,
          },
          { where: { id: createdTeams[one].dataValues.id } }
        );
        // await student.update({ team_id: listTeamId[one] });
        one++;
      }
    }
    return res.status(200).json({
      message: "Teams are successfully assigned to Mentees",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.teamidToMentor = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(400).json({
        message: "Only Admin can access",
      });
    }
    const createdTeams = await Team.findAll();
    if (createdTeams.length == 0) {
      return res.status(400).json({
        message: "Teams are not created",
      });
    }
    const listOfTeamid = createdTeams.map((team) => team.id);

    const mentorList = await Mentor.findAll({
      where: { team_id: null },
      order: [["Experience", "ASC"]],
    });
    if (mentorList.length == 0) {
      return res.status(400).json({
        message: "Teams are already assigned",
      });
    }
    let mentorIndex1 = 0;
    let mentorIndex2 = mentorList.length / 2;

    for (let i = 0; i < listOfTeamid.length; i++) {
      const teamid = listOfTeamid[i];

      const mentorid1 = mentorList[mentorIndex1].id;
      const mentorid2 = mentorList[mentorIndex2].id;

      const updatedMentors = await Mentor.update(
        { team_id: teamid },
        {
          where: {
            id: {
              [Op.in]: [mentorid1, mentorid2],
            },
          },
        }
      );
      mentorIndex1 = (mentorIndex1 + 1) % mentorList.length;
      mentorIndex2 = (mentorIndex2 + 1) % mentorList.length;
    }

    res.json({ message: "Teams are successfully assigned to mentors" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.addSingleUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(400).json({
        message: "Only Admin can access",
      });
    }
    const {
      email,
      first_name,
      last_name,
      University,
      home_city,
      dob,
    } = req.body;
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await hash(password, 10);
    const user = await User.create({
      email: email,
      password: hashedPassword,
      role: "Mentee",
      is_active: true,
    });
    const newMentee = await Mentee.create({
      user_id: user.id,
      first_name,
      last_name,
      University,
      home_city,
      dob,
    });
    // implement email system here
    // implement email system here
    console.log(newMentee.id);
    const menteeid = newMentee.id;
    const mentee = await Mentee.findOne({
      attributes: ["team_id"],
      where: {
        id: menteeid,
      },
    });

    if (mentee.dataValues.team_id) {
      return res.status(400).json({
        success: false,
        message: "Team id already assigned.",
      });
    }
    const listOfTeamidCount = await Team.findAll();
    if (listOfTeamidCount.length == 0) {
      return res.status(400).json({
        message: "No teams avaliable.",
      });
    }
    // console.log(listOfTeamidCount[0].dataValues.student_count);
    let updatedUser;
    for (let i = 0; i < listOfTeamidCount.length; i++) {
      const teamID = listOfTeamidCount[i].id;
      if (listOfTeamidCount[i].total_team_members < 10) {
        updatedUser = await Mentee.update(
          { team_id: teamID },
          { where: { id: menteeid } }
        );
        await Team.update(
          {
            total_team_members:
              listOfTeamidCount[i].dataValues.total_team_members + 1,
          },
          { where: { id: teamID } }
        );
        break;
      }
    }
    if (!updatedUser) {
      res.status(400).json({
        message: "All teams are full",
        listOfTeamidCount,
      });
    }
    res.status(200).json({
      message: `${first_name} is added`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.removeid = async (req, res) => {
  try {
    // Using Sequelize to update records
    await Mentor.update({ team_id: null }, { where: {} });
    await Mentee.update({ team_id: null }, { where: {} });
    await Query.destroy({
      where: {},
      truncate: true,
    });
    // Using Sequelize to delete all records
    await Team.destroy({ where: {} });

    res.status(200).json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.assignProject = async (req, res) => {
  try {
    const role = req.user.role;
    if (role === "Admin" || role === "Mentee") {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }
    // console.log(req.user.id);

    const mentorTeamId = await Mentor.findOne({
      where: { user_id: req.user.id },
      attributes: ["team_id"],
      raw: true, // Return plain data, not Sequelize instances
    });

    if (!mentorTeamId.team_id) {
      return res.status(400).json({
        message: "Team is not assgined",
      });
    }
    // console.log(mentorTeamId.team_id);

    const team = await Team.findOne({
      where: { id: mentorTeamId.team_id },
    });
    if (team.project_id) {
      return res.status(200).json({
        message: "Project is already assigned",
      });
    }
    if (team) {
      console.log("Found team:", req.body.formData);
      const newProject = await Project.create({
        ...req.body.formData,
      });
      console.log(newProject);
      await team.update({ project_id: newProject.dataValues.id });
    } else {
      res.status(400).json({
        success: true,
        message: "Project is not able to assign.",
      });
    }
    res.status(201).json({
      success: true,
      message: "Project assigned successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.mentorDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    // Fetch mentor details and include the associated team
    const mentorDetails = await Mentor.findOne({
      where: { user_id: userId },
      include: [
        {
          model: Team,
          attributes: ["id", "team_name", "project_id", "total_team_members"],
          include: [
            {
              model: Project,
              attributes: [
                "id",
                "name",
                "description",
                "start_date",
                "end_date",
                "status",
                "git_repository_link",
                "trello_board_link",
              ],
            },
          ],
        },
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });
    const mentorsList = await Mentor.findAll({
      where: {team_id: mentorDetails?.Team?.id},
      attributes: ["id", "first_name", "last_name"],
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ]
    })
    // console.log(mentorDetails);
    const menteesList = await Mentee.findAll({
      where: { team_id: mentorDetails?.Team?.id },
      attributes: ["id", "team_id", "first_name", "last_name"], // Specify the properties you want to retrieve
      include: [
        {
          model: User,
          attributes: ["email"],
        }
      ]
    });
    // console.log(menteesList);
    if (mentorDetails) {
      const formattedResponse = {
        mentorInfo: {
          id: mentorDetails.id,
          user_id: mentorDetails.user_id,
          first_name: mentorDetails.first_name,
          last_name: mentorDetails?.last_name,
          email: mentorDetails.User.email,
          Experience: mentorDetails.Experience,
          createdAt: mentorDetails.createdAt,
          updatedAt: mentorDetails.updatedAt,
        },
        teamInfo: {
          id: mentorDetails.Team?.id,
          team_name: mentorDetails.Team?.team_name,
          project_id: mentorDetails.Team?.project_id,
          total_team_members: mentorDetails.Team?.total_team_members,
        },
        projectInfo: {
          id: mentorDetails.Team.Project?.id,
          name: mentorDetails.Team.Project?.name,
          description: mentorDetails.Team.Project?.description,
          start_date: mentorDetails.Team.Project?.start_date,
          end_date: mentorDetails.Team.Project?.end_date,
          status: mentorDetails.Team.Project?.status,
          git: mentorDetails.Team.Project?.git_repository_link,
          trello: mentorDetails.Team.Project?.trello_board_link,
        },
        teamMembersInfo: {
          mentorsList,
          menteesList,
        },
      };
      return res.status(200).json({
        success: true,
        message: "Mentor details fetched successfully",
        formattedResponse,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.menteeDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("------------------------------------------------------------------");
    // console.log(userId);
    // Fetch mentor details and include the associated team
    const menteeDetails = await Mentee.findOne({
      where: { user_id: userId },
      include: [
        {
          model: Team,
          attributes: ["id", "team_name", "project_id", "total_team_members"],
          include: [
            {
              model: Project,
              attributes: [
                "id",
                "name",
                "description",
                "start_date",
                "end_date",
                "status",
              ],
            },
          ],
        },
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });
    const mentorsList = await Mentor.findAll({
      where: {team_id: menteeDetails?.Team?.id},
      attributes: ["id", "first_name", "last_name"],
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ]
    })
    // console.log(menteeDetails);
    const menteesList = await Mentee.findAll({
      where: { team_id: menteeDetails?.Team?.id },
      attributes: ["id", "team_id", "first_name", "last_name"], // Specify the properties you want to retrieve
      include: [
        {
          model: User,
          attributes: ["email"],
        }
      ]
    });
    // console.log(menteesList);
    if (menteeDetails) {
      const formattedResponse = {
        menteeInfo: {
          id: menteeDetails.id,
          user_id: menteeDetails.user_id,
          first_name: menteeDetails.first_name,
          last_name: menteeDetails?.last_name,
          email: menteeDetails.User.email,
          University: menteeDetails.University,
          dob: menteeDetails.dob,
          home_city: menteeDetails?.home_city,
          createdAt: menteeDetails.createdAt,
          updatedAt: menteeDetails.updatedAt,
        },
        teamInfo: {
          id: menteeDetails.Team?.id,
          team_name: menteeDetails.Team?.team_name,
          project_id: menteeDetails.Team?.project_id,
          total_team_members: menteeDetails.Team?.total_team_members,
        },
        projectInfo: {
          id: menteeDetails.Team.Project?.id,
          name: menteeDetails.Team.Project?.name,
          description: menteeDetails.Team.Project?.description,
          start_date: menteeDetails.Team.Project?.start_date,
          end_date: menteeDetails.Team.Project?.end_date,
          status: menteeDetails.Team.Project?.status,
        },
        teamMembersInfo: {
          mentorsList,
          menteesList,
        },
      };
      return res.status(200).json({
        success: true,
        message: "Mentee details fetched successfully",
        formattedResponse,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Mentee not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE MENTOR DETAILS FROM MENTOR DASHBOARD
exports.updateMentor = async (req, res) => {
  try{
    const {user_id, email, ...data} = req.body;
    const mentor_record = await Mentor.findOne({
      where: {user_id}
    });
    const user_record = await User.findOne({
      where: {id : user_id}
    });
    // console.log("---------------------------------------------------------------");
    // console.log(mentor_record);
    // console.log(user_record);
    if(mentor_record && user_record)
    {
      const updatedUser = await user_record.update({email});
      const updatedMentor = await mentor_record.update({...data});
      console.log("Record updated successfully: ",updatedUser.toJSON(), updatedMentor.toJSON());
      res.status(200).json({
        success: true,
        message: "Mentor details updated successfully!",
      })
    }else{
      res.status(404).json({
        success: false,
        message: "Mentor details Not Found",
      })
    }
  }catch(error){
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// UPDATE MENTEE DETAILS FROM MENTOR DASHBOARD
exports.updateMentee = async (req, res) => {
  try{
    const {user_id, email, ...data} = req.body;
    const mentee_record = await Mentee.findOne({
      where: {user_id}
    });
    const user_record = await User.findOne({
      where: {id : user_id}
    });
    if(mentee_record && user_record)
    {
      const updatedUser = await user_record.update({email});
      const updatedMentee = await mentee_record.update({...data});
      console.log("Record updated successfully: ",updatedUser.toJSON(), updatedMentee.toJSON());
      res.status(200).json({
        success: true,
        message: "Mentee details updated successfully!",
      })
    }else{
      res.status(404).json({
        success: false,
        message: "Mentee details Not Found",
      })
    }
  }catch(error){
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


exports.createQuery = async (req, res) => {
  try {
    const { text, reply_id, team_id } = req.body;
    const newQuery = await Query.create({
      text,
      user_id: req.user.id,
      reply_id,
      team_id,
    });

    // You may want to send the newly created query as a response
    res
      .status(201)
      .json({ query: newQuery, message: "Query created successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.allQuery = async (req, res) => {
  try {
    // console.log(req.qu.id);
    let teamId;
    let queries;
    let id = req.query.id || null;
    if (req.user.role == "Mentor") {
      const mentor = await Mentor.findOne({
        where: { user_id: req.user.id },
        attributes: ["team_id"],
      });
      teamId = mentor.dataValues.team_id;
      queries = await Query.findAll({
        where: { reply_id: id, team_id: teamId },
      });
    } else {
      const mentee = await Mentee.findOne({
        where: { user_id: req.user.id },
        attributes: ["team_id"],
      });
      teamId = mentee.dataValues.team_id;
      queries = await Query.findAll({
        where: { reply_id: id, team_id: teamId },
      });
    }
    console.log(teamId);

    res.status(201).json({
      success: true,
      queries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
