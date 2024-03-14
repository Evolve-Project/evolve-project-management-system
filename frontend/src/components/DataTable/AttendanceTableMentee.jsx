import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const AttendanceTable = ({ attendanceData }) => {
    const [sortedData, setSortedData] = useState(attendanceData);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const sortByDate = () => {
        const sorted = [...sortedData].sort((a, b) => {
            const dateA = new Date(a.date_of_meet);
            const dateB = new Date(b.date_of_meet);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setSortedData(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} px-3 py-2 rounded-md mx-1`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="flex justify-center mt-4">
                {pageNumbers}
            </div>
        );
    };

    useEffect(() => {
        setSortedData(attendanceData);
    }, [attendanceData]);

    return (
        <div className="flex justify-center">
            <div className="w-full p-10">
                <Table>
                    <TableCaption>Attendance</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px] cursor-pointer" onClick={sortByDate}>
                                Date
                                {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                            </TableHead>
                            <TableHead className="text-left">Description</TableHead>
                            <TableHead className="text-left w-[100px]">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell className="font-medium">{data.date_of_meet}</TableCell>
                                <TableCell>{data.description}</TableCell>
                                <TableCell>{data.attendance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {renderPagination()}
            </div>
        </div>
    );
};

export default AttendanceTable;