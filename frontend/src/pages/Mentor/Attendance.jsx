import { Button } from '@/components/ui/button'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar"
import { cn } from '@/lib/utils'
import { Checkbox } from "@/components/ui/checkbox"
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
import { CreateAttendance } from '@/api/attendanceApi';

const Attendance = () => {
  const userData = {
    users: [
      {
        name: 'Aarav',
        email: 'aarav@example.com',
        id: 1
      },
      {
        name: 'Isha',
        email: 'isha@example.com',
        id: 2
      },
      {
        name: 'Rohan',
        email: 'rohan@example.com',
        id: 3
      },
      {
        name: 'Neha',
        email: 'neha@example.com',
        id: 4
      },
      {
        name: 'Kiran',
        email: 'kiran@example.com',
        id: 5
      },
      {
        name: 'Anaya',
        email: 'anaya@example.com',
        id: 6
      },
      {
        name: 'Vikram',
        email: 'vikram@example.com',
        id: 7
      }
    ]
  };

  const form = useForm()

  const [open, setOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  const onSubmit = async (data) => {

    if (data.date == null | data.attendance == null) {
      Swal.fire({
        title: 'Error!',
        text: 'Select correct date and mentees',
        icon: 'error',
        confirmButtonText: 'Retry'
      })
      setOpen(false);
    } else {
      const id = crypto.randomUUID()
      data.id = id;
      attendanceData.push(data);
      try {
        CreateAttendance(data);
      } catch (error) {
        console.log(error);
      }
    }
    setOpen(false);
  };

  // Function to remove user from attendance
  const removeUser = (id, userId) => {
    const updatedAttendance = attendanceData.map(at => {
      if (at.id === id) {
        return {
          ...at,
          attendance: at.attendance.filter(id => id !== userId)
        };
      }
      return at;
    });
    setAttendanceData(updatedAttendance);
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
                      <FormLabel className="text-base">Sidebar</FormLabel>
                      <FormDescription>
                        Select the items you want to display in the sidebar.
                      </FormDescription>
                    </div>
                    {userData.users.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="attendance"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={Array.isArray(field.value) ? field.value.includes(item.id) : false}
                                  onCheckedChange={(checked) => {
                                    if (Array.isArray(field.value)) {
                                      field.onChange(
                                        checked
                                          ? [...field.value, item.id]
                                          : field.value.filter((value) => value !== item.id)
                                      );
                                    } else {
                                      field.onChange([item.id]);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.name}
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>

      </Dialog>
      <div className='w-9/12 flex justify-center mx-auto'>
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]  text-left">Date</TableHead>
              <TableHead className="w-[100px]  text-center">Total Present</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData.map((at) => (
              <TableRow key={at.id}>
                <TableCell className="border border-gray-300 p-2 text-left">
                  <Dialog>
                    <DialogTrigger>{`${at.date.getDate()}-${at.date.getMonth() + 1}-${at.date.getFullYear()}`}</DialogTrigger>
                    <DialogContent>
                      <DialogHeader className={"flex flex-row justify-center items-center"}>
                        <DialogTitle className="m-auto">List of Present Students</DialogTitle>
                        <Button className="m-auto">Remove</Button>
                      </DialogHeader>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead className="text-center">Email</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {at.attendance.map((id) => (
                            <TableRow key={id}>
                              <TableCell className="font-medium">
                                {userData.users.find(user => user.id === id)?.name}
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

                <TableCell className="border border-gray-300 p-2 text-center">{at.attendance.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div >

  )
}

export default Attendance