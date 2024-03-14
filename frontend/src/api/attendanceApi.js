import axios from "axios"
axios.defaults.withCredentials = true

export async function CreateAttendance(attendanceData) {
    return await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/createAttendance`, attendanceData)
}

export async function FetchMentees() {
    return await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getMentees`);
}


export async function FetchAttendance() {
    return await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getAttendance`);
}


export async function FetchMentorName(mentorId) {
    return await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/getMentorName`, mentorId);
}


export async function DeleteAttendance(attendanceArray) {
    return await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/deleteAttendance`, attendanceArray);
}

export async function UpdateAttendance(attendanceArray) {
    return await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/updateAttendance`, attendanceArray)
}