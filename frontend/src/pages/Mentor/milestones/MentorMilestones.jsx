import React, { useState, useEffect ,useReducer} from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Box, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { loadMilestones } from "@/api/milestoneApi.js";
import { Select } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AddMilestone from "./AddMilestone.jsx";
import Tasks from "./Tasks.jsx";

function MentorMilestones() {
  const [status, setStatus] = useState([]);
  const [milestoneDesc, setMilestoneDesc] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [milestoneId, setMilestoneId] = useState([]);
  const [milestone_Id, setMilestone_Id] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [mentees, setMentees] = useState([]);
  
  const history = useNavigate();

  useEffect(() => {
    async function fetchMentees() {
      try {
        console.log("Fetching mentees...");
        const response = await axios.get("http://localhost:8000/api/getMentees");
        console.log("Mentees response:", response.data);
        setMentees(response.data);
      } catch (error) {
        console.error("Error fetching mentees:", error);
      }
    }

    fetchMentees();
  }, []);
  
  
  
  useEffect(() => {
    async function fetchMilestoneDesc() {
      try {
        console.log("Fetching milestones...");

        const response = await axios.get(
          "http://localhost:8000/api/get-milestones"
        );
        console.log("Milestones response:", response.data);
        setMilestoneDesc(response.data);
      } catch (error) {
        console.error("Error fetching milestone description:", error);
      }
    }
     
    fetchMilestoneDesc();
  }, []);

  useEffect(() => {
    async function fetchMilestoneForStatus() {
      try {
        console.log("Fetching milestonesforStatus...");
        const response = await axios.get(
          "http://localhost:8000/api/get-milestonesForStatus"
        );
        console.log("Milestones response:", response.data);
        setMilestoneId(response.data);
      } catch (error) {
        console.error("Error fetching milestone for status:", error);
      }
    }

    fetchMilestoneForStatus();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  const fetchTasks = async (milestoneDescId) => {
    try {
      const response = await axios.post("http://localhost:8000/api/get-tasks", {
        milestoneDescId,
      });
      const newTasks = response.data;
      console.log(newTasks);
      console.log(newTasks.length);
      console.log(newTasks[0]?.milestone_id);
      setTasks(newTasks);
      setMilestone_Id(newTasks.length > 0 ? newTasks[0].milestone_id : 0); 
      history.push("/milestones?refresh=true");
      // Update milestone_Id based on new tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    
  };

  useEffect(() => {
    // This code will run after the component renders
    fetchTasks()
  }, []);

  const handleBackButtonClick = () => {
    setToggle(true); // Set toggle to true to show milestones
    setTasks([]); // Clear tasks
    setMilestone_Id(0); // Clear milestone_Id
    
  };

  
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              status: newStatus === "true",
            };
          }
          return task;
        })
      );

      const response = await axios.post(
        "http://localhost:8000/api/update-task-status",
        {
          taskId: taskId,
          newStatus: newStatus === "true",
        }
      );
      console.log("Update status response:", response.data);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
    
    //history.push("/milestones?refresh=true");
  };

  useEffect(() => {
    // This code will run after the component renders
   handleStatusChange()
  }, []);
  const deleteTask = async (taskId) => {
    try {
      // Make a DELETE request to the server
      console.log(taskId)
      const response = await axios.post(`http://localhost:8000/api/delete-task`, {
        taskId
      });
    
      history.push("/milestones?refresh=true");
      // Check if the request was successful
      if (response.status === 200) {
        console.log('Task deleted successfully');
        // Optionally, you can perform any additional actions after the task is deleted
      } else {
        // If the response status is not OK, throw an error
        throw new Error('Failed to delete task');
        
      }
      history.push("/milestones?refresh=true");
    } catch (error) {
      // Handle any errors
      console.error('Error deleting task:', error);
    }

   
  };
  
  useEffect(() => {
    // This code will run after the component renders
   deleteTask()
  }, []);

  const getMenteeName = (menteeId) => {
    const mentee = mentees.users.find((m) => m.id === menteeId);
    return mentee ? mentee.first_name +" " + mentee.last_name : "Unknown Mentee";
  };
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {toggle ? (
       
          <div>
            <Box maxW={1000} mx="auto" px={6} frontSize="sm">
              <div className="feedback_title_container">
                <span className="feedback_title_bar"></span>
                <span className="feedback_title">Milestones</span>
                <span className="feedback_title_bar"></span>
              </div>
              <br />
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr className="bg-gray-200 text-black-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Description</th>
                    <th className="py-3 px-6 text-left">Start Date</th>
                    <th className="py-3 px-6 text-left">End Date</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Tasks</th>
                  </tr>
                </thead>
                <tbody className="text-black-600 text-bg font-dark">
                  {milestoneDesc.map((milestone, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-2 px-4 text-left whitespace-nowrap">
                        {milestone.name}
                      </td>
                      <td className="py-2 px-4 text-left">
                        {milestone.description}
                      </td>
                      <td className="py-2 px-4 text-left">
                        {formatDate(milestone.start_date)}
                      </td>
                      <td className="py-2 px-4 text-left">
                        {formatDate(milestone.end_date)}
                      </td>
                      <td className="py-2 px-4 text-left relative">
                        <select value={milestoneId[index] ? "true" : "false"}>
                          <option value="false">Completed</option>
                          <option value="true">In Progress</option>
                        </select>
                      </td>
                      <td className="">
                        <div className="">
                          <button
                            className=" mt-2 mr-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                            onClick={() => {
                              setToggle(false);
                              fetchTasks(milestone.id);
                            }}
                          >
                            view
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </div>
        
      ) : (
        
          <>
            <Tasks milestoneId={milestone_Id} />
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr className="bg-gray-200 text-black-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-left">Due Date</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Mentee Assigned</th>
                </tr>
              </thead>
              <tbody className="text-black-600 text-bg font-dark">
                {currentTasks.map((task, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-2 px-3 text-left whitespace-nowrap">
                      {task.task_name}
                    </td>
                    <td className="py-2 px-3 text-left">{task.task_desc}</td>
                    <td className="py-2 px-3 text-left">
                      {formatDate(task.task_completion_datetime)}
                    </td>
                    <td className="py-2 px-3 text-left">
                      <select
                        value={task.status ? "true" : "false"}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value === "true")
                        }
                      >
                        <option value="false">In Progress</option>
                        <option value="true">Completed</option>
                      </select>
                    </td>
                    <td className="py-2 px-3 text-left">
      {getMenteeName(task.mentee_user_id)}
    </td>
                    <td className="py-2 px-3 text-left">
                      <button
                        className="text-red-600 hover:text-red-900 focus:outline-none"
                        onClick={() => deleteTask(task.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 6l3 15h12l3-15H3zm9 2v8m-4-4h8"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button
                className="flex top-3 right-5 mt-2 mr-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className="flex top-3 right-5 mt-2 mr-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentTasks.length < tasksPerPage}
              >
                Next
              </button>
            </div>
            <button
              className="fixed top-3 right-5 mt-2 mr-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              onClick={handleBackButtonClick}
            >
              Back
            </button>
         </> 
        
      )}
    </>
  );
}

export { MentorMilestones as default };
