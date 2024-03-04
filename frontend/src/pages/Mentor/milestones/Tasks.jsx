import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar"
import { cn } from '@/lib/utils'
import { Checkbox } from "@/components/ui/checkbox"
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
import { Select } from '@chakra-ui/react'

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [attendance, setAttendance] = useState({});
  const [description, setDescription] = useState('');

  const handleCreateTask = (e) => {
    e.preventDefault();
    const taskData = {
      date,
      attendance,
      description
    };
    console.log('Task data:', taskData);
    // Here, you can perform any client-side operations like validation before submitting
    // Alternatively, you can send this data to your backend API for processing
    // axios.post('/create-task', taskData).then((response) => { handle success or error });
  };
 
  return (
    <div>
      <h2>Tasks</h2>
      <Dialog open={open} onOpenChange={setOpen}>
      <div className='flex justify-end mx-10'>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Create Task</Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Task</DialogTitle>
          <DialogDescription>Create Task</DialogDescription>
        </DialogHeader>
        <Form onSubmit={handleCreateTask}>
          <div className="space-y-8">
            <div className="flex flex-col">
              <label className="text-black">Name of the task</label>
              <textarea
                placeholder="Task Name"
                value={name}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col" >
              <label className="text-black">Description</label>
              <textarea
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-4">
            <label className="text-black">  Assign Mentee</label>
            <Select placeholder='Choose'>
                          <option value='option1'>Purnima</option>
                          <option value='option1'>Harsha</option>
                          <option value='option1'>Ashutosh</option>
                          <option value='option1'>Monish</option>
                          <option value='option1'>Shubham</option>
            </Select>
                
            </div>
            <div className="mb-4flex flex-col">
            <label className="text-black">  Due Date</label>
            <br />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            
            <Button type="submit">Submit</Button>
          </div>
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
