import React from 'react'
import { loadMilestones } from '../../api/milestone';


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
      
    </div>
  )
}

export default MentorMilestone
