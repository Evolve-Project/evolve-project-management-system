import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
export function Bulkmentor() {
  const [button, setButton] = useState(true);
  const [toggle, setToggle] = useState(false);
  const form = useForm({
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = async (values) => {
    setToggle(true)
    const formData = new FormData();
    formData.append("role", "Mentor");
    var fileInput = document.getElementById("id"); // Assuming you have an input element with id "fileInput"
    var file = fileInput.files[0]; // Get the first file selected by the user
    formData.append("file", file, file.name);
    // console.log("file", file, file.name);
    // formData.append('file', values.file);
    // 'file' is the name of your input field
    // console.log(response.data.details.successfulAdds);
    const { data } = await axios.post(
      "http://localhost:8000/api/add-bulk-users",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (data.details.successfulAdds) {
      setButton(false);
    }
    console.log(data);
    console.log(data.details.successfulAdds + "member added");
  };
  async function addMentorToTeam() {
    const { data } = await axios.get(
      "http://localhost:8000/api/teamidToMentor"
    );
    console.log(data);
    //close the form
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload File</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Name"
                  {...field}
                  type="file"
                  id="id"
                />
              </FormControl>
              <FormDescription>File Format : Excel</FormDescription>
            </FormItem>
          )}
        />
        {button && <Button disabled={toggle} type="submit">Upload</Button>}
      </form>
      {!button && (
        <Button onClick={addMentorToTeam} className="mt-2">
          Add to Team
        </Button>
      )}
    </Form>
  );
}
export function Bulkmentee() {
  const [button, setButton] = useState(true);
  const [toggle, setToggle] = useState(false);
  const form = useForm({
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values) => {
    setToggle(true)
    const formData = new FormData();
    formData.append("role", "Mentee");
    var fileInput = document.getElementById("id1"); // Assuming you have an input element with id "fileInput"
    var file = fileInput.files[0]; // Get the first file selected by the user
    formData.append("file", file, file.name);
    console.log("file", file, file.name);
    // formData.append('file', values.file);
    // 'file' is the name of your input field

    const { data } = await axios.post(
      "http://localhost:8000/api/add-bulk-users",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (data.details.successfulAdds) {
      setButton(false);
    }
    console.log(data);
    console.log(data.details.successfulAdds + "member added");
  };
  async function addMenteeToTeam() {
    const { data } = await axios.get(
      "http://localhost:8000/api/teamidToMentee"
    );
    console.log(data);
    //close the form
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload File</FormLabel>
              <FormControl>
                <Input type="File" {...field} id="id1" />
              </FormControl>
              <FormDescription>File Format : Excel</FormDescription>
            </FormItem>
          )}
        />
        {button && <Button disabled={toggle} type="submit">Upload</Button>}
      </form>
      {!button && (
        <Button onClick={addMenteeToTeam} className="mt-2">
          Add to Team
        </Button>
      )}
    </Form>
  );
}
