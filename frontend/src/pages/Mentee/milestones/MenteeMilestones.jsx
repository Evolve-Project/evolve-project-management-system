
import React, { useState, useEffect } from "react";
import axios from "axios";



function MenteeMilestones() {
  const [status, setStatus] = useState([]);
  const [milestoneDesc, setMilestoneDesc] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [milestoneId, setMilestoneId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);

  const [mentees, setMentees] = useState([]);
  
  

  useEffect(() => {
    async function fetchMentees() {
      try {
        console.log("Fetching mentees...");
        const response = await axios.get("http://localhost:8000/api/get-menteesbyId");
        console.log("Mentees response:", response.data);
        console.log("here it  mentees...");
        setMentees(response.data);
      } catch (error) {
        console.error("Error fetching mentees:", error);
      }
    }

    fetchMentees();
  }, [tasks]);

  

  useEffect(() => {
    async function fetchMilestoneDesc() {
      try {
        console.log("Fetching milestones...");
        const response = await axios.get("http://localhost:8000/api/get-milestones");
        console.log("Milestones response:", response.data);
        setMilestoneDesc(response.data);
      } catch (error) {
        console.error("Error fetching milestone description:", error);
      }
    }

    fetchMilestoneDesc();
  }, [tasks]);

  useEffect(() => {
    async function fetchMilestoneForStatus() {
      try {
        console.log("Fetching milestonesforStatus...");
        const response = await axios.get("http://localhost:8000/api/get-milestonesForStatus");
        console.log("Milestones for status response:", response.data);
        setMilestoneId(response.data);
      } catch (error) {
        console.error("Error fetching milestone for status:", error);
      }
    }

    fetchMilestoneForStatus();
  }, [tasks]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  const fetchTasks = async (milestoneDescId) => {
    try {
      const response = await axios.post("http://localhost:8000/api/get-tasks", { milestoneDescId });
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    
    const fetchTasks = async (milestoneDescId) => {
      try {
        const response = await axios.post("http://localhost:8000/api/get-tasks", { milestoneDescId });
        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [tasks]);

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

      const response = await axios.post("http://localhost:8000/api/update-task-status", {
        taskId: taskId,
        newStatus: newStatus === "true",
      });
      console.log("Update status response:", response.data);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  const getMenteeName = (menteeId) => {
    const mentee = mentees.find((m) => m.user_id === menteeId);
    return mentee ? `${mentee.first_name} ${mentee.last_name}` : "Unknown Mentee";
  };
  return (
    <>
      {toggle ? (
          <div>
            
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
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-2 px-4 text-left whitespace-nowrap">{milestone.name}</td>
                      <td className="py-2 px-4 text-left">{milestone.description}</td>
                      <td className="py-2 px-4 text-left">{formatDate(milestone.start_date)}</td>
                      <td className="py-2 px-4 text-left">{formatDate(milestone.end_date)}</td>
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
          
          </div>
       
      ) : (
        <> 
          
         
          
                
                <span className="feedback_title">Tasks</span>
               
              
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
                    <td className="py-2 px-3 text-left whitespace-nowrap">{task.task_name}</td>
                    <td className="py-2 px-3 text-left">{task.task_desc}</td>
                    <td className="py-2 px-3 text-left">{formatDate(task.task_completion_datetime)}</td>
                    <td className="py-2 px-3 text-left">
                      <select
                        value={task.status ? "true" : "false"}
                        onChange={(e) => handleStatusChange(task.id, e.target.value === "true")}
                      >
                        <option value="false">In Progress</option>
                        <option value="true">Completed</option>
                      </select>
                    </td>
                    <td className="py-2 px-3 text-left">
      {getMenteeName(task.mentee_user_id)}
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
              onClick={() => setToggle(true)}
            >
              Back
            </button>
          
        </>
      )}
    </>
  );
}

export { MenteeMilestones as default };