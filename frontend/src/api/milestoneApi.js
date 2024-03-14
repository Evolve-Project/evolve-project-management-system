import axios from 'axios'
axios.defaults.withCredentials = true

export async function loadMilestones() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/get-milestones`);
        // If the request is successful, return the data
        return response;
    } catch (error) {
        // If there's an error, handle it
        console.error('Error loading milestones:', error);
        // You might want to throw the error so the caller can handle it further
        throw error;
    }
}

