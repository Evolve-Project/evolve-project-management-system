import React from 'react'
import {Box , Heading}  from "@chakra-ui/react"
import { ChakraProvider } from '@chakra-ui/react';
import theme from "../../../components/theme/theme.jsx"

import MilestoneTableMentee from './MilestoneTableMentee.jsx';

function MenteeMilestones() {
  return (
    <div>
      <h1>Mentee Milestone</h1>
      <ChakraProvider theme={theme}>
      <Box maxW = {1000} mx="auto" px={6} frontSize="sm"> 
      <Heading ab={10}>Tasks</Heading>

     <MilestoneTableMentee/>
      </Box>
      </ChakraProvider>
    </div>
  )
}

export default MenteeMilestones
