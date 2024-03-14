import React, { useEffect } from 'react'
import "@/styles/title.css";
import { useState } from 'react';
import TeamDropdown from '@/components/Attendance/TeamDropdown';
import { FetchAttendanceByMentorID, FetchUsersByTeam } from '@/api/attendanceApi';
import AttendanceTable from '@/components/DataTable/AttendanceTableMentee';

const Attendance = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [attendanceData, SetAttendanceData] = useState('');
  const handleTeamSelect = async (teamId) => {
    setSelectedTeam(teamId);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (selectedTeam) {
        try {
          const response = await FetchUsersByTeam({ teamID: selectedTeam });
          const mentorIds = response.data.mentors.map(mentor => mentor.User.id);

          // Fetch attendance for each mentor-mentee pair
          const attendanceResponse = await FetchAttendanceByMentorID({ mentorID: mentorIds[0] });
          SetAttendanceData(attendanceResponse.data);
        } catch (error) {
          console.error('Error fetching team details:', error);
        }
      }
    }
    fetchDetails();
  }, [selectedTeam]);

  // const fetchAttendance = async (mentorId) => {
  //   try {
  //     const response = await FetchAttendanceByMentorMentee({
  //       mentorId: mentorId,
  //     });
  //     console.log(response);
  //     // Process the fetched attendance data
  //   } catch (error) {
  //     console.error('Error fetching attendance:', error);
  //   }
  // };


  return (
    <div className='container'>
      <div className="title">Attendance</div>
      <TeamDropdown onTeamSelect={handleTeamSelect} />
      {attendanceData && < AttendanceTable attendanceData={attendanceData} />}
    </div>
  )
}

export default Attendance
