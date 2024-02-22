import axios from 'axios'
axios.defaults.withCredentials = true

export async function CreateAttendance(attendanceData) {
    return await axios.post('http://localhost:8000/api/createAttendance', attendanceData)
}