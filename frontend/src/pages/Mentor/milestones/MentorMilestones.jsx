import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button } from '@mui/material'
import {Box , Heading}  from "@chakra-ui/react"
import { ChakraProvider } from '@chakra-ui/react';
import { loadMilestones } from '@/api/milestoneApi.js';
import { Select } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import theme from "./themes/theme.jsx"
import AddMilestone from './AddMilestone.jsx';
function MentorMilestones() {
  const [status, setStatus] = useState([]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const [milestoneDesc, setMilestoneDesc] = useState([]);
  

  useEffect(() => {
    async function fetchMilestoneDesc() {
      try {
        console.log("Fetching milestones..."); // Check if useEffect is triggered
        const response = await axios.get('http://localhost:8000/api/get-milestones');
        console.log("hi")
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

  return (
    <div>
      <Button></Button>
        
        
      <ChakraProvider theme={theme}>
      <Box maxW = {1000} mx="auto" px={6} frontSize="sm"> 
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
                  <td className="py-2 px-4 text-left">
                   <Link   to={`/milestones/${milestone.name}` } ><button className="bg-gray-200 text-gray-800 py-1 px-4 rounded-full">View</button></Link>
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

   
      </Box>
      </ChakraProvider>
    </div>
  )
}

export default MentorMilestones
