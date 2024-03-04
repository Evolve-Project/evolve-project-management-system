
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'

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

import { Textarea } from "@/components/ui/textarea"

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const form = useForm()
  useEffect(() => {
    async function fetchTasks() {
      try {
        console.log("Fetching tasks..."); // Check if useEffect is triggered
        const response = await axios.get('http://localhost:8000/api/get-tasks');
        console.log("task response:", response.data); // Check the response from the API
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    
    fetchTasks();
  }, []);
  return (
    <div>
      <h2>Tasks</h2>
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
                                {item.first_name + " " + item.last_name}
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
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name}</li>

        ))}
      </ul>
    </div>
  )
}

export default Tasks
