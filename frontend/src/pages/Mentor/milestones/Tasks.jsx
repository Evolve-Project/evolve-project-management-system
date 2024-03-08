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
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [taskname, setTaskname] = useState('');

  
  const handleCreateTask = (e) => {
    {console.log("create task called")}
    e.preventDefault();
    const taskData = {
      taskname,
      date,
      description,
      assignee
    };
    console.log('Task data:', taskData);
    
    
    // Send data to the backend
    axios.post('http://localhost:8000/api/create-task', taskData)
      .then((response) => {
        // Handle success
        console.log('Task created successfully:', response.data);
        // Optionally, you can close the dialog here
        setTaskname('');
      setDate('');
      setDescription('');
      setAssignee('');
        setOpen(false);
      })
      .catch((error) => {
        // Handle error
        console.error('Error creating task:', error);
      });
  };

  
 
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className='flex justify-left mx-10'>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Create Task</Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new Task</DialogTitle>
            <DialogDescription>Create Task</DialogDescription>
          </DialogHeader>
          <Form >
            <div className="space-y-8">
              <div className="flex flex-col">
                <label className="text-black">Name of the task</label>
                <textarea
                  placeholder="Task Name"
                  value={taskname}
                  onChange={(e) => setTaskname(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black">Description</label>
                <textarea
                  placeholder="Task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="text-black">Assign Mentee</label>
                <Select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  placeholder='Choose'>
                  <option value='Purnima'>Purnima</option>
                  <option value='Harsha'>Harsha</option>
                  <option value='Ashutosh'>Ashutosh</option>
                  <option value='Monish'>Monish</option>
                  <option value='Shubham'>Shubham</option>
                </Select>
              </div>
              <div className="mb-4flex flex-col">
                <label className="text-black">Due Date</label>
                <br />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <Button type="submit" onClick={(e) => { handleCreateTask(e); setOpen(false); }}>Submit</Button>
              
            </div>
            {console.log("this should call create task")}
          </Form>
        </DialogContent>
      </Dialog>
      <br />
    </div>
  )
}

export default Tasks
