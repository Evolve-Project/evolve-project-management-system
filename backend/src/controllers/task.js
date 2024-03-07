const { fetchTeamId } = require('../services/user_services');
const { Task } = require('../models')
async function createTask(req,res){
    try {
        // Extract task data from the request body
        const { taskname, date, description, assignee } = req.body;
        const teamId = await fetchTeamId(req.user.id, req.user.role);
        // Create a new task instance
        const newTask = await Task.create({
          task_name: taskname,
          task_desc: description,
          milestone_id: 7, // Assuming milestone_id
          mentee_user_id: 1, // Assuming assignee is the user ID
          mentor_user_id: req.user.id, // Assuming mentor_user_id
          status: false,
          task_completion_datetime: date // Assuming date is the completion date
        });
    
        // Respond with the created task
        res.status(201).json(newTask);
      } catch (error) {
        // Handle any errors
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'An error occurred while creating the task' });
      }
}

module.exports = {
    createTask
  };