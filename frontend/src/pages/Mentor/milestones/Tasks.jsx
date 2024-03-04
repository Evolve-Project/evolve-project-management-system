import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        console.log("Fetching tasks..."); // Check if useEffect is triggered
        const response = await axios.get('http://localhost:8000/api/get-tasks');
        console.log("task response:", response.data); // Check the response from the API
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    
    fetchTasks();
  }, []);
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Tasks
