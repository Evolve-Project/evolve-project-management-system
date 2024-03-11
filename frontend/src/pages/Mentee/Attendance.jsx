import { Button } from '@/components/ui/button'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar"
import { cn } from '@/lib/utils'
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { CalendarIcon } from 'lucide-react';
import Swal from 'sweetalert2';
import { CreateAttendance, FetchAttendance, FetchMentees } from '@/api/attendanceApi';
import { Textarea } from "@/components/ui/textarea"
import AttendanceDatatable from '@/components/DataTable/AttendanceDataTable';
import { useEffect } from 'react';
import AttendanceTableMentee from '@/components/DataTable/AttendanceTableMentee';

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
        <h1 className='mb-4 text-4xl dark:text-white py-4'>Attendance</h1>
      </div>
      {console.log(attendanceData)}
      {attendanceData.length > 0 && <AttendanceTableMentee attendanceData={attendanceData} />}
    </div >

  )
}

export default MenteeAttendance

