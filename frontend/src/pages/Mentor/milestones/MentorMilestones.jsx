import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button } from '@mui/material'
import {Box , Heading}  from "@chakra-ui/react"
import { ChakraProvider } from '@chakra-ui/react';
import { loadMilestones } from '@/api/milestoneApi.js';

import theme from "./themes/theme.jsx"
function MentorMilestones() {

  const [milestoneDesc, setMilestoneDesc] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

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
        
        <h1>Mentee Milestone</h1>
      <ChakraProvider theme={theme}>
      <Box maxW = {1000} mx="auto" px={6} frontSize="sm"> 
      <Heading ab={10}>Milestones</Heading>
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
                  <td className="py-3 px-5 text-left whitespace-nowrap">{milestone.name}</td>
                  <td className="py-3 px-5 text-left">{milestone.description}</td>
                  <td className="py-3 px-5 text-left">{formatDate(milestone.start_date)}</td>
                  <td className="py-3 px-5 text-left">{formatDate(milestone.end_date)}</td>
                  <td className="py-3 px-6 text-left relative">
                    <button
                      className="bg-blue-500 text-white py-1 px-4 rounded-full"
                      onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown on click
                    >
                      On Progress
                    </button>
                    {/* Show dropdown only if showDropdown is true */}
                    {showDropdown && (
                      <div className="absolute mt-1 w-32 bg-white rounded-md shadow-lg">
                        <button className="block py-2 px-4 text-gray-800 hover:bg-gray-100 w-full text-left">On Progress</button>
                        <button className="block py-2 px-4 text-gray-800 hover:bg-gray-100 w-full text-left">Done</button>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button className="bg-gray-200 text-gray-800 py-1 px-4 rounded-full">View Details</button>
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
