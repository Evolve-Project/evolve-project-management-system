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

const Attendance = () => {
  const form = useForm()

  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState({});
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    // Fetch user data from API when component mounts
    const fetchUserData = async () => {
      const response = await FetchMentees();
      setUserData(response.data);
      // console.log(oldUserData);
    };
    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    // Log userData whenever it changes
    // console.log(userData);
  }, [userData]);

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


  // const onSubmit = async (data) => {
  //   console.log(data);

  //   if (data.date == null | data.attendance == null) {
  //     Swal.fire({
  //       title: 'Error!',
  //       text: 'Select correct date and mentees',
  //       icon: 'error',
  //       confirmButtonText: 'Retry'
  //     })
  //     setOpen(false);
  //   } else {
  //     const id = crypto.randomUUID()
  //     data.id = id;
  //     data.name = "Harsh Verma";
  //     attendanceData.push(data);
  //     try {
  //       // CreateAttendance(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     attendanceData.sort((a, b) => new Date(a.date) - new Date(b.date));
  //     setAttendanceData([...attendanceData]); // Trigger re-render
  //   }
  //   setOpen(false);
  // };
  const onSubmit = async (data) => {

    // Extract radio button keys and values
    const radioEntries = Object.entries(data)
      .filter(([key]) => key.startsWith("radio-") && data[key] !== undefined);

    // Construct attendance object
    const attendance = {};
    radioEntries.forEach(([key, value]) => {
      const userId = key.replace("radio-", "");
      attendance[userId] = value;
      delete data[key]; // Remove the radio button field
    });

    data.attendance = attendance;
    if (data.date == null || data.attendance == null) {
      Swal.fire({
        title: 'Error!',
        text: 'Select correct date and mentees',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
      setOpen(false);
      return;
    }
    try {
      const response = await CreateAttendance(data);
    } catch (error) {
      if (data.date == null || data.attendance == null) {
        Swal.fire({
          title: 'Error!',
          text: 'Another meeting with that date already exists',
          icon: 'error',
          confirmButtonText: 'Retry'
        });
        setOpen(false);
        return;
      }
      console.log("Failed to create attendance ", error);
    }
    // setAttendanceData([...attendanceData]);
    setOpen(false);
  };




  return (
    <div className='flex flex-col justify-end'>
      <div className='flex justify-center'>
        <h1 className='mb-4 text-4xl dark:text-white py-4'>Attendance</h1>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>

        <div className='flex justify-end mx-10'> {/* Aligns the button to the right */}
          <DialogTrigger asChild>
            <Button>Create Attendance</Button>
          </DialogTrigger>
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new attendance</DialogTitle>
            <DialogDescription>
              Select a date and present users
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Meeting</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attendance"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                    </div>
                    {userData.users.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name={`radio-${item.id}`} // Include user ID in the name
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-row"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="Present" />
                                    </FormControl>
                                    <span className="text-sm font-normal">Present</span> {/* Radio label */}
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="Absent" />
                                    </FormControl>
                                    <span className="text-sm font-normal">Absent</span> {/* Radio label */}
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="Permitted" />
                                    </FormControl>
                                    <span className="text-sm font-normal">Permitted</span> {/* Radio label */}
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.name} {item.first_name} {item.last_name} {/* Display user's name and email */}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Attendance description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>

      </Dialog>

      {userData.users != null && attendanceData != null && <AttendanceDatatable attendanceData={attendanceData} userData={userData} />}
    </div >

  )
}

export default Attendance

