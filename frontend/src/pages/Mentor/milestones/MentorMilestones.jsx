import React, { useState, useEffect } from "react";
import axios from "axios";
import Tasks from "./Tasks.jsx";


function MentorMilestones() {
  const [status, setStatus] = useState([]);
  const [milestoneDesc, setMilestoneDesc] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [milestoneId, setMilestoneId] = useState([]);

  const [milestoneId2, setMilestoneId2] = useState([]);
  const [milestone_Id, setMilestone_Id] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMilestoneDesc, setCurrentMilestoneDesc] = useState(null);
  const [tasksPerPage] = useState(6);

  const [mentees, setMentees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching data...");
        const menteesResponse = await axios.get(
          "http://localhost:8000/api/getMentees"
        );
        console.log("Mentees response:", menteesResponse.data);
        setMentees(menteesResponse.data);

        const milestoneDescResponse = await axios.get(
          "http://localhost:8000/api/get-milestones"
        );
        console.log("Milestones response:", milestoneDescResponse.data);
        setMilestoneDesc(milestoneDescResponse.data);

        const milestoneIdResponse = await axios.get(
          "http://localhost:8000/api/get-milestonesForStatus"
        );
        console.log("Milestone IDs response:", milestoneIdResponse.data);
        setMilestoneId(milestoneIdResponse.data);
        setMilestoneId2(milestoneIdResponse.data);
        console.log(milestoneId2)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (currentMilestoneDesc) {
      fetchTasks(currentMilestoneDesc);
    }
  }, [currentMilestoneDesc]);




  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  const fetchTasks = async (milestoneDescId) => {
    try {
      console.log("This is inside fetch tasks", milestoneDescId);
      const response = await axios.post("http://localhost:8000/api/get-tasks", {
        milestoneDescId,
      });
      const newTasks = response.data;
      console.log(newTasks);
      console.log(newTasks.length);
      console.log(newTasks[0]?.milestone_id);
      setTasks(newTasks);
      setMilestone_Id(newTasks.length > 0 ? newTasks[0].milestone_id : 0);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
  };

  const handleStatusChangeMilestone = async (milestoneId, newStatus) => {
    try {
      console.log(milestoneId);
      console.log(newStatus);

      const response = await axios.post(
        "http://localhost:8000/api/update-task-status-milestone",
        { milestoneId, newStatus }
      );
      console.log("Update status response:", response.data);

      const updatedrid = response.data.id;
      //  const updatedrstatus = response.data.status;
      //     // Update the status of the task in the frontend

      //     const updatedMilestones = milestoneIdResponse.data.map((milestone) =>
      //     milestone.id === milestoneId
      //       ? { ...milestone, status: response.data.status }
      //       : milestone
      //   );
      setMilestoneId2(updatedMilestones);

    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };



  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/update-task-status",
        { taskId, newStatus }
      );
      console.log("Update status response:", response.data);

      // Update the status of the task in the frontend
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus === "true" } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/delete-task",
        { taskId }
      );
      console.log("Delete task response:", response.data);

      // Remove the task from the frontend
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getMenteeName = (menteeId) => {
    const mentee = mentees.users.find((m) => m.id === menteeId);
    return mentee
      ? `${mentee.first_name} ${mentee.last_name}`
      : "Unknown Mentee";
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBackButtonClick = () => {
    setToggle(true); // Set toggle to true to show milestones
    setTasks([]); // Clear tasks
    setMilestone_Id(0); // Clear milestone_Id
    setCurrentMilestoneDesc(null);
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

                    <select
                      value={milestoneId2[index].status ? "true" : "false"}
                      onChange={(e) =>
                        handleStatusChangeMilestone(
                          milestoneId2[index].id,
                          e.target.value
                        )
                      }
                    >
                      {milestoneId2[index].status ? (
                        <>
                          <option value="false">In Progress</option>
                          <option value="true">Completed</option>
                        </>
                      ) : (
                        <>
                          <option value="false">In Progress</option>
                          <option value="true">Completed</option>
                        </>
                      )}
                    </select>
                  </td>
                  <td className="">
                    <div className="">
                      <button
                        className=" mt-2 mr-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                        onClick={() => {
                          setToggle(false);
                          setCurrentMilestoneDesc(milestone.id);
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
          <Tasks milestoneId={milestone_Id} onTaskCreated={fetchTasks} />
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
                        handleStatusChange(task.id, e.target.value)
                      }
                    >
                      {task.status ? (
                        <option value="true">Completed</option>
                      ) : (
                        <>
                          <option value="false">In Progress</option>
                          <option value="true">Completed</option>
                        </>
                      )}
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
