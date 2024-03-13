import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

function Tasks({ milestoneId }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [taskname, setTaskname] = useState("");
  const [mentees, setMentees] = useState([]);
  const [errors, setErrors] = useState({
    taskname: "",
    description: "",
    assignee: "",
    date: ""
  });
  const history = useNavigate();

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

    // Basic form validation
    const errorsCopy = { ...errors };
    let formIsValid = true;

    if (!taskname) {
      errorsCopy.taskname = "Task name is required";
      formIsValid = false;
    } else {
      errorsCopy.taskname = "";
    }

    if (!description) {
      errorsCopy.description = "Description is required";
      formIsValid = false;
    } else {
      errorsCopy.description = "";
    }

    if (!assignee) {
      errorsCopy.assignee = "Assignee is required";
      formIsValid = false;
    } else {
      errorsCopy.assignee = "";
    }

    if (!date) {
      errorsCopy.date = "Due date is required";
      formIsValid = false;
    } else {
      errorsCopy.date = "";
    }

    setErrors(errorsCopy);

    if (!formIsValid) {
      return;
    }

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

      // Optionally, you can close the dialog here
      setTaskname("");
      setDate("");
      setDescription("");
      setAssignee("");
      setOpen(false);

      // Call the callback function to notify the parent component
      // Assuming onTaskCreated is passed as a prop from the parent component
      if (typeof onTaskCreated === "function") {
        onTaskCreated();
      }

      //history.push("/milestones?refresh=true");
    } catch (error) {
      // Handle error
      console.error("Error creating task:", error);
    }
  };

  useEffect(() => {
    if (!open) {
      // Clear form data when the dialog is closed
      setTaskname("");
      setDescription("");
      setAssignee("");
      setDate("");
      setErrors({
        taskname: "",
        description: "",
        assignee: "",
        date: ""
      });
    }
  }, [open]);

  return (
    <div>
      <br />
      <Dialog open={open} onOpenChange={setOpen} >
        <div className="flex justify-left mx-10">
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Create Task</Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new Task</DialogTitle>
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
                {errors.taskname && <span className="text-red-500">{errors.taskname}</span>}
              </div>
              <div className="flex flex-col">
                <label className="text-black">Description</label>
                <textarea
                  placeholder="Task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <span className="text-red-500">{errors.description}</span>}
              </div>
              <div className="mb-4">
                <label className="text-black">Assign Mentee</label>
                <br />
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  placeholder="Choose"
                >
                  <option value="">choose</option>
                  {mentees &&
                    mentees.users &&
                    mentees.users.map((mentee) => (
                      <option key={mentee.id} value={mentee.id}>
                        {mentee.first_name} {mentee.last_name}
                      </option>
                    ))}
                </select>
                {errors.assignee && <span className="text-red-500">{errors.assignee}</span>}
              </div>
              <div className="mb-4flex flex-col">
                <label className="text-black">Due Date</label>
                <br />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {errors.date && <span className="text-red-500">{errors.date}</span>}
              </div>
              
              <Button
                type="submit"
                onClick={(e) => {
                  handleCreateTask(e);
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