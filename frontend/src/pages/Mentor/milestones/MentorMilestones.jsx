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
  const [milestoneDescId, setMilestoneDescId] = useState('');

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
  }, []);




  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };
 

  const fetchTasks = async (id) => {
    try {
      const response = await axios.post('http://localhost:8000/api/get-tasks', { id });
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [milestoneDescId]);

  const handleViewClick = async (id) => {

    try {
      // Send the milestone name to the server

      await axios.post('http://localhost:8000/api/get-tasks', { id });
      // Handle success or any further action

    } catch (error) {
      console.error('Error sending milestone name:', error);
    }
  };

  return (
    <>
      {toggle ? (
        <div>
          <Button></Button>


          <ChakraProvider theme={theme}>
            <Box maxW={1000} mx="auto" px={6} frontSize="sm">
              <div>
                <div><Heading ab={8}>Milestones</Heading></div>
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
                        <Select placeholder='In Progress'>
                          <option value='option1'>Completed</option>


                        </Select>

                      </td>
                      <td className="">

                        <div className="">
                          <button
                            className=" mt-2 mr-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
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
          </ChakraProvider>
        </div>
      ) : (
        <div className="max-w-md mx-auto mt-11">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Tasks</h1>
            <Tasks />
          </div>
          <button
            className="fixed top-5 right-5 mt-2 mr-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            onClick={() => setToggle(true)}
          >
            Back
          </button>
        </div>
      )}
    </>
  )
}

export default MentorMilestones
