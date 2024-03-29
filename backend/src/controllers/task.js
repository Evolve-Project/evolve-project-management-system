const { fetchTeamId } = require('../services/user_services');
const { Task } = require('../models')
async function createTask(req,res){
    try {
        

        // Extract task data from the request body
        const { taskname, date, description, assignee_id,milestone_id
        } = req.body;
        const teamId = await fetchTeamId(req.user.id, req.user.role);

          
        // Create a new task instance
        const newTask = await Task.create({
          task_name: taskname,
          task_desc: description,
          milestone_id:milestone_id, // Assuming milestone_id
          mentee_user_id: assignee_id, // Assuming assignee is the user ID
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


const updateTaskStatus = async (req, res) => {
  const { taskId, newStatus } = req.body;
  try {
    // Update the task status in the database
    const [rowsAffected, [updatedTask]] = await Task.update(
      { status: newStatus },
      { where: { id: taskId }, returning: true }
    );

    // Check if the task was updated successfully
    if (rowsAffected === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Return the updated task
    return res.json(updatedTask);
  } catch (error) {
    // Handle any errors and send a 500 error response
    console.error('Error updating task status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteTask = async (req, res) => {
  const { taskId } = req.body; // Assuming taskId is passed as a URL parameter

  try {
    // Find the task by its ID and delete it
    const deletedTaskCount = await Task.destroy({
      where: { id: taskId }
    });

    // Check if any task was deleted
    if (deletedTaskCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Respond with a success message
    return res.status(200).json({ message: 'Task deleted successfully' });
  } 
    catch (error) {
      if (error instanceof TypeError) {
        console.error('Network error:', error.message);
      } else {
        console.error('Error deleting task:', error.message);
      }
  }
};

module.exports = {
    createTask,
    updateTaskStatus,
    deleteTask
  };