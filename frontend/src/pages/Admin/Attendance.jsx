import React, { useEffect } from 'react'
import "@/styles/title.css";
import { useState } from 'react';
import TeamDropdown from '@/components/Attendance/TeamDropdown';
import { FetchAttendanceByMentorID, FetchMenteesByMentor, FetchUsersByTeam } from '@/api/attendanceApi';
import AttendanceTable from '@/components/DataTable/AttendanceTableMentee';
import AttendanceDatatable from '@/components/DataTable/AttendanceDataTable';

const Attendance = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [attendanceData, SetAttendanceData] = useState('');
  const [userData, setUserData] = useState({});

  const handleTeamSelect = async (teamId) => {
    setSelectedTeam(teamId);
  };

  useEffect(() => {
    // Log userData whenever it changes
    console.log(userData);
  }, [userData]);


  useEffect(() => {
    const fetchDetails = async () => {
      if (selectedTeam) {
        try {
          const response = await FetchUsersByTeam({ teamID: selectedTeam });
          const mentorIds = response.data.mentors.map(mentor => mentor.User.id);
          const menteeIds = response.data.mentee.map(mentee => mentee.User.id);
          console.log(menteeIds);
          // Fetch attendance for each mentor-mentee pair
          const attendanceResponse = await FetchAttendanceByMentorID({ mentorID: mentorIds[0] });
          SetAttendanceData(attendanceResponse.data);
          const userdata = await FetchMenteesByMentor({ mentor_id: mentorIds[0] });
          setUserData(userdata.data);
        } catch (error) {
          console.error('Error fetching team details:', error);
        }
      }
    }
    fetchDetails();
  }, [selectedTeam]);

  return (
    <div className='container'>
      <div className="title">Attendance</div>
      <TeamDropdown onTeamSelect={handleTeamSelect} />
      {userData && userData.users && attendanceData && < AttendanceDatatable attendanceData={attendanceData} userData={userData} />}
    </div>
  )
}

export default Attendance
