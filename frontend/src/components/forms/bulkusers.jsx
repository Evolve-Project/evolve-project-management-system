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
export function Bulkmentor() {
  const form = useForm({
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(values) {
    // Do something with the form values.
    console.log(values);
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
                <Input placeholder="Enter Name" {...field} type="file" />
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

  function onSubmit(values) {
    // Do something with the form values.
    console.log(values);
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
                <Input type="File" {...field} />
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
