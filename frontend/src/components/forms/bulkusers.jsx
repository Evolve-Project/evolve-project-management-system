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
export function Bulkmentor() {
  const form = useForm({
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("role", "Mentor");
    var fileInput = document.getElementById('id'); // Assuming you have an input element with id "fileInput"
    var file = fileInput.files[0]; // Get the first file selected by the user
    formData.append('file', file, file.name);
    console.log("file",file, file.name)
    // formData.append('file', values.file);
     // 'file' is the name of your input field

    axios.post('http://localhost:8000/api/add-bulk-users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  };

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
                <Input placeholder="Enter Name" {...field} type="file" id="id" />
              </FormControl>
              <FormDescription>File Format : Excel</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Upload</Button>
        <Button className="ml-2">Add to Team</Button>
      </form>
    </Form>
  );
}
export function Bulkmentee() {
  const form = useForm({
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("role", "Mentee");
    var fileInput = document.getElementById('id1'); // Assuming you have an input element with id "fileInput"
    var file = fileInput.files[0]; // Get the first file selected by the user
    formData.append('file', file, file.name);
    console.log("file",file, file.name)
    // formData.append('file', values.file);
     // 'file' is the name of your input field

    axios.post('http://localhost:8000/api/add-bulk-users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  };

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
        <Button type="submit">Submit</Button>
        <Button className="ml-2">Add to team</Button>
      </form>
    </Form>
  );
}