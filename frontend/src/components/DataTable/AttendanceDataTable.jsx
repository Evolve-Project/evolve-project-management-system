import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ArrowUpward, ArrowDownward, Edit } from '@mui/icons-material'; // Import icons
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FetchMentorName } from '@/api/attendanceApi';

const AttendanceDatatable = ({ attendanceData, userData }) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [mentorNames, setMentorNames] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMentorNames = async () => {
      const mentorIds = [...new Set(attendanceData.map(data => data.mentor_user_id))];
      const mentorNamesData = await Promise.all(mentorIds.map(async mentorId => {
        const response = await FetchMentorName({ mentorId: mentorId });
        const mentorNameData = response.data.data;
        return { [mentorId]: mentorNameData };
      }));
      const mentorNamesObj = Object.assign({}, ...mentorNamesData);
      setMentorNames(mentorNamesObj);
    };

    fetchMentorNames();
  }, [attendanceData]);

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortDirection === 'asc';
    setSortBy(property);
    setSortDirection(isAsc ? 'desc' : 'asc');
  };

  const groupedData = Object.values(attendanceData).reduce((acc, cur) => {
    const key = `${cur.mentor_user_id}-${cur.date_of_meet}`;
    if (!acc[key]) {
      acc[key] = { mentor_user_id: cur.mentor_user_id, date_of_meet: cur.date_of_meet, description: cur.description, totalAttendance: 0 };
    }
    if (cur.attendance === 'Present') {
      acc[key].totalAttendance++;
    }
    return acc;
  }, {});

  // Convert grouped data object into array
  const sortedData = Object.values(groupedData).sort((a, b) => {
    if (sortBy) {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      if (valueA < valueB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  // Pagination
  const itemsPerPage = 5;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const paginatedData = sortedData.slice(firstIndex, lastIndex);

  return (
    <div className='w-9/12 flex flex-col justify-center mx-auto my-2'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="w-[100px]  text-left" onClick={() => handleSort('mentor_user_id')}>
                Mentor Name
                {sortBy === 'mentor_user_id' && (sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </TableCell>
              <TableCell className="w-[100px]  text-left" onClick={() => handleSort('date_of_meet')}>
                Date
                {sortBy === 'date_of_meet' && (sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </TableCell>
              <TableCell className="w-[100px]  text-left">Description</TableCell>
              <TableCell className="w-[100px]  text-center">Attendance</TableCell>
              <TableCell className="w-[5px] text-center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((at) => (
              <TableRow key={`${at.mentor_user_id}-${at.date_of_meet}`}>
                <TableCell className="border border-gray-300 p-2 text-center">{mentorNames[at.mentor_user_id] || 'Loading...'}</TableCell>
                <TableCell className="border border-gray-300 p-2 text-left">
                  {`${new Date(at.date_of_meet).getDate()}-${new Date(at.date_of_meet).getMonth() + 1}-${new Date(at.date_of_meet).getFullYear()}`}
                </TableCell>
                <TableCell className="border border-gray-300 p-2 text-center">{at.description}</TableCell>
                <TableCell className="border border-gray-300 p-2 text-center">{at.totalAttendance}</TableCell>
                <TableCell className="border border-gray-300 p-0 text-center">
                  <Dialog>
                    <DialogTrigger><Edit /></DialogTrigger>
                    <DialogContent>
                      <DialogHeader className={"flex flex-row justify-center items-center"}>
                        <DialogTitle className="m-auto">List of Present Students</DialogTitle>
                        <Button className="m-auto">Remove</Button>
                      </DialogHeader>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell className="">Name</TableCell>
                            <TableCell className="text-center">Email</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* Adjustment may be needed here depending on the structure of userData */}
                          {/* Assuming mentee_user_id represents the user IDs */}
                          {attendanceData
                            .filter(item => item.mentor_user_id === at.mentor_user_id && item.date_of_meet === at.date_of_meet && item.attendance === 'Present')
                            .map(item => (
                              <TableRow key={item.mentee_user_id}>
                                <TableCell className="font-medium">
                                  {userData.users.find(user => user.id === item.mentee_user_id)?.first_name + " " + userData.users.find(user => user.id === item.mentee_user_id)?.last_name}
                                </TableCell>
                                <TableCell className="font-medium text-center">
                                  {userData.users.find(user => user.id === item.mentee_user_id)?.email}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination Controls */}
      <div style={{ position: 'absolute', bottom: '100px', right: '35%' }}>
        <Button className='mx-2' disabled={currentPage === 1} onClick={() => setCurrentPage(prevPage => prevPage - 1)}>Previous</Button>
        <Button className='mx-2' disabled={lastIndex >= sortedData.length} onClick={() => setCurrentPage(prevPage => prevPage + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default AttendanceDatatable;
