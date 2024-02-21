import axios from 'axios'


export async function loadMilestones() {
    return await axios.get('http://localhost:8000/api//get-milestones')
}