import React from 'react'
import { useState } from 'react';
import Swal from 'sweetalert2';
import { FetchAttendance, FetchMentees } from '@/api/attendanceApi';
import { useEffect } from 'react';
import AttendanceTableMentee from '@/components/DataTable/AttendanceTableMentee';
import "@/styles/userDashboard.css";

const MenteeAttendance = () => {
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    // Fetch user data from API when component mounts
    const fetchAttendanceData = async () => {
      const response = await FetchAttendance();
      setAttendanceData(response.data);
      // console.log(oldUserData);
    };
    fetchAttendanceData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    // Log userData whenever it changes
    // console.log(userData);
  }, [attendanceData]);


  return (
    <div className='flex flex-col justify-end'>
      <div className='flex justify-center'>
        <div className="dashboard_title_container">
          <span className="dashboard_title_bar"></span>
          <span className="dashboard_title">Attendance</span>
          <span className="dashboard_title_bar"></span>
        </div>      </div>
      {console.log(attendanceData)}
      {attendanceData.length > 0 && <AttendanceTableMentee attendanceData={attendanceData} />}
    </div >

  )
}

export default MenteeAttendance

