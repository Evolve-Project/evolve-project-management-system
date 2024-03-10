import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button } from '@mui/material'
import { Box, Heading } from "@chakra-ui/react"
import { ChakraProvider } from '@chakra-ui/react';
import { loadMilestones } from '@/api/milestoneApi.js';
import { Select } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import theme from "./themes/theme.jsx"
import AddMilestone from './AddMilestone.jsx';
import Tasks from './Tasks.jsx';
function MentorMilestones() {
  const [status, setStatus] = useState([]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const [milestoneDesc, setMilestoneDesc] = useState([]);
  const [toggle, setToggle] = useState(true);

 
  
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function fetchMilestoneDesc() {
      try {
        console.log("Fetching milestones..."); // Check if useEffect is triggered
        const response = await axios.get('http://localhost:8000/api/get-milestones');

        console.log("Milestones response:", response.data); // Check the response from the API
        setMilestoneDesc(response.data);
      } catch (error) {
        console.error('Error fetching milestone description:', error);
      }

    }

    fetchMilestoneDesc();
  }, [tasks]);

 
  const [milestoneId, setMilestoneId] = useState('');
  useEffect(() => {
    async function fetchMilestoneForStatus() {
      try {
        console.log("Fetching milestonesforStatus..."); // Check if useEffect is triggered
        const response = await axios.get('http://localhost:8000/api/get-milestonesForStatus');

        console.log("Milestones response:", response.data); // Check the response from the API
        setMilestoneId(response.data);
      } catch (error) {
        console.error('Error fetching milestone for status:', error);
      }

    }

    fetchMilestoneForStatus();
  }, [tasks]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };
 

const fetchTasks = async (milestoneDescId) => {
    try {
      const response = await axios.post('http://localhost:8000/api/get-tasks', { milestoneDescId });
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Update the status locally
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task, // Spread the task object
            status: newStatus === 'true'
          };
        }
        return task;
      }));
  
      // Send a request to the backend to update the status
      const response = await axios.post('http://localhost:8000/api/update-task-status', {
        taskId: taskId, // Corrected property name
        newStatus: newStatus === 'true'
      });
      console.log("Update status response:", response.data); // Check the response from the API
      // Handle success if needed
    } catch (error) {
      console.error('Error updating task status:', error);
      // Handle error if needed
    }
  };
  

 

  return (
    <>
      {toggle ? (
        <ChakraProvider theme={theme}>
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
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-2 px-4 text-left whitespace-nowrap">{milestone.name}</td>
                      <td className="py-2 px-4 text-left">{milestone.description}</td>
                      <td className="py-2 px-4 text-left">{formatDate(milestone.start_date)}</td>
                      <td className="py-2 px-4 text-left">{formatDate(milestone.end_date)}</td>
                      
                      <td className="py-2 px-4 text-left relative">
                      <Select value={milestoneId[index] ? 'true' : 'false'}  >
                      
        <option value='false'>Completed</option>
        <option value='true'>In Progress</option>
      </Select>

                      </td>
                      
                      <td className="">

                        <div className="">
                          <button
                            className=" mt-2 mr-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                            onClick={() => { setToggle(false); fetchTasks(milestone.id); }}
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
        </ChakraProvider>
      ) : (
        <ChakraProvider theme={theme}>
        <div className="max-w-xlg mx-auto mt-11">
          
          
            
          <Tasks/>
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
                  {tasks.map((task, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-2 px-3 text-left whitespace-nowrap">{task.task_name}</td>
                      <td className="py-2 px-3 text-left">{task.task_desc}</td>
                      <td className="py-2 px-3 text-left">{formatDate(task.task_completion_datetime)}</td>
                      <td className="py-2 px-3 text-left">   <Select value={task.status ? 'true' : 'false'} onChange={(e) => handleStatusChange(task.id, e.target.value === 'true')}>
          <option value='false'>In Progress</option>
          <option value='true'>Completed</option>
        </Select>

                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
              
          </div>
          <button
            className="flex top-3 right-5 mt-2 mr-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            onClick={() => setToggle(true)}
          >
            Back
          </button>
        
        </ChakraProvider>
      )}
    </>
  )
  
}

export { MentorMilestones as default };

