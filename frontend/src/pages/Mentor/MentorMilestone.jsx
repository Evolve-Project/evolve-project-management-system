import React from 'react'
import { loadMilestones } from '../../api/milestone';
import {Box , Heading}  from "@chakra-ui/react"

import MilestoneTable from './MilestoneTable';
import { ChakraProvider } from '@chakra-ui/react';
import theme from "../../components/theme/theme.jsx"


function MentorMilestone() {
    

async function fetchMilestones() {
    try {
        const response = await loadMilestones();
        // Handle the response data here
        console.log(response.data);
    } catch (error) {
        // Handle errors here
        console.error('Error loading milestones:', error);
    }
}

fetchMilestones();
    
  return (
    <div>
      <h1>Mentor Milestone</h1>
      <ChakraProvider theme={theme}>
      <Box maxW = {1000} mx="auto" px={6} frontSize="sm"> 
      <Heading ab={10}>TenStack Table</Heading>
      <MilestoneTable/>
      </Box>
      </ChakraProvider>
    </div>
  )
}

export default MentorMilestone
