import React, { useState, useEffect,useReducer } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@chakra-ui/react";

function Tasks({ milestoneId}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [taskname, setTaskname] = useState("");
  const [mentees, setMentees] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    async function fetchMentees() {
      try {
        console.log("Fetching mentees...");
        console.log(milestoneId);
        const response = await axios.get("http://localhost:8000/api/getMentees");
        console.log("Mentees response:", response.data);
        setMentees(response.data);
      } catch (error) {
        console.error("Error fetching mentees:", error);
      }
    }

    fetchMentees();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    console.log("create task called");

    try {
      const selectedMentee = mentees.users.find(
        (mentee) => mentee.id === parseInt(assignee)
      );
      if (!selectedMentee) {
        console.error("Selected mentee not found.");
        return;
      }

      const taskData = {
        taskname,
        date,
        description,
        assignee_id: selectedMentee.id,
        milestone_id: milestoneId, // Send the milestoneId to the backend
      };

      console.log("Task data:", taskData);

      const response = await axios.post(
        "http://localhost:8000/api/create-task",
        taskData
      );

      console.log("Task created successfully:", response.data);
      onTaskCreated(); // Call the callback function to notify the parent component
      // Optionally, you can close the dialog here
      setTaskname("");
      setDate("");
      setDescription("");
      setAssignee("");
      setOpen(false);

      forceUpdate();
    } catch (error) {
      // Handle error
      console.error("Error creating task:", error);
    }
  };

  return (
    <div>
      <br />
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex justify-left mx-10">
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Create Task</Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new Task</DialogTitle>
            <DialogDescription>Create Task</DialogDescription>
          </DialogHeader>
          <Form>
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
                  placeholder="Choose"
                >
                  {mentees &&
                    mentees.users &&
                    mentees.users.map((mentee) => (
                      <option key={mentee.id} value={mentee.id}>
                        {mentee.first_name} {mentee.last_name}
                      </option>
                    ))}
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
              <Button
                type="submit"
                onClick={(e) => {
                  handleCreateTask(e);
                  setOpen(false);
                }}
              >
                Submit
              </Button>
            </div>
            {console.log("this should call create task")}
          </Form>
        </DialogContent>
      </Dialog>
      <br />
    </div>
  );
}

export default Tasks;