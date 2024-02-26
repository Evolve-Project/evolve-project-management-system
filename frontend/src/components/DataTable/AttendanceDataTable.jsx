import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ArrowUpward, ArrowDownward, Edit } from '@mui/icons-material'; // Import icons
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


const AttendanceDatatable = ({ attendanceData, userData }) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  // const userData = {
  //   users: [
  //     {
  //       name: 'Aarav',
  //       email: 'aarav@example.com',
  //       id: 1
  //     },
  //     {
  //       name: 'Isha',
  //       email: 'isha@example.com',
  //       id: 2
  //     },
  //     {
  //       name: 'Rohan',
  //       email: 'rohan@example.com',
  //       id: 3
  //     },
  //     {
  //       name: 'Neha',
  //       email: 'neha@example.com',
  //       id: 4
  //     },
  //     {
  //       name: 'Kiran',
  //       email: 'kiran@example.com',
  //       id: 5
  //     },
  //     {
  //       name: 'Anaya',
  //       email: 'anaya@example.com',
  //       id: 6
  //     },
  //     {
  //       name: 'Vikram',
  //       email: 'vikram@example.com',
  //       id: 7
  //     }
  //   ]
  // };
  // const [attendanceData, setAttendanceData] = useState([
  //   {
  //     id: 1,
  //     name: "Harsh",
  //     description: "Project meeting",
  //     date: new Date("2024-02-22"),
  //     attendance: [1, 2, 3] // Assuming these are user IDs present on this date
  //   },
  //   {
  //     id: 2,
  //     name: "Verma",
  //     description: "Project meeting",
  //     date: new Date("2024-02-21"),
  //     attendance: [4, 5, 6]
  //   },
  //   {
  //     id: 3,
  //     name: "Harsh",
  //     description: "Project meeting",
  //     date: new Date("2024-02-20"),
  //     attendance: [2, 3, 7]
  //   },
  //   {
  //     id: 4,
  //     name: "Verma",
  //     description: "Project meeting",
  //     date: new Date("2024-02-19"),
  //     attendance: [1, 4, 6]
  //   },
  //   {
  //     id: 5,
  //     name: "Harsh",
  //     description: "Project meeting",
  //     date: new Date("2024-02-18"),
  //     attendance: [3, 5, 7]
  //   },
  //   {
  //     id: 6,
  //     name: "Verma",
  //     description: "Project meeting",
  //     date: new Date("2024-02-17"),
  //     attendance: [1, 2, 6]
  //   },
  //   {
  //     id: 7,
  //     name: "Harsh",
  //     description: "Project meeting",
  //     date: new Date("2024-02-16"),
  //     attendance: [3, 4, 5]
  //   },
  //   {
  //     id: 8,
  //     name: "Verma",
  //     description: "Project meeting",
  //     date: new Date("2024-02-15"),
  //     attendance: [1, 4, 7]
  //   }
  // ]);

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortDirection === 'asc';
    setSortBy(property);
    setSortDirection(isAsc ? 'desc' : 'asc');
  };

  const sortedData = [...attendanceData].sort((a, b) => {
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

  return (
    <div className='w-9/12 flex justify-center mx-auto my-2'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="w-[100px]  text-left" onClick={() => handleSort('name')}>
                Mentor Name
                {sortBy === 'name' && (sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </TableCell>
              <TableCell className="w-[100px]  text-left" onClick={() => handleSort('date')}>
                Date
                {sortBy === 'date' && (sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </TableCell>
              <TableCell className="w-[100px]  text-left">Description</TableCell>
              <TableCell className="w-[100px]  text-center">Total Present</TableCell>
              <TableCell className="w-[5px] text-center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((at) => (
              <TableRow key={at.id}>
                <TableCell className="border border-gray-300 p-2 text-center">{at.name}</TableCell>
                <TableCell className="border border-gray-300 p-2 text-left">
                  {`${at.date.getDate()}-${at.date.getMonth() + 1}-${at.date.getFullYear()}`}
                </TableCell>
                <TableCell className="border border-gray-300 p-2 text-center">{at.description}</TableCell>
                <TableCell className="border border-gray-300 p-2 text-center">{at.attendance.length}</TableCell>
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
                            <TableCell className="w-[100px]">Name</TableCell>
                            <TableCell className="text-center">Email</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {at.attendance.map((id) => (
                            <TableRow key={id}>
                              <TableCell className="font-medium">
                                {userData.users.find(user => user.id === id)?.first_name}
                              </TableCell>
                              <TableCell className="font-medium text-center">
                                {userData.users.find(user => user.id === id)?.email}
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
    </div>
  );
};

export default AttendanceDatatable;
