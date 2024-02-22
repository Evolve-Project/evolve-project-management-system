import axios from 'axios'


export async function loadMilestones() {
    axios.get('http://localhost:8000/api/get-milestones')
  .then(response => {
    // Handle successful response
    console.log(response.data); // This will log the milestones fetched from the backend
  })
  .catch(error => {
    // Handle error
    console.error('Error fetching milestones:', error);
  });
}

