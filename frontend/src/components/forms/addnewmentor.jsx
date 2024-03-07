import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
export function Addmentor() {

  function onSubmit(values) {
    // Do something with the form values.
    console.log(values);
   axios.post('http://localhost:8000/api/add-user', values)
      .then((response) => {
        // Handle success
        console.log('successful:', response.data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
      });
  }
  const formSchema = z.object({
    first_name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    last_name: z.string().min(1, {
      message: "Name must be at least 1 characters.",
    }),
    Experience:z
    .string()
    .min(1)
    .refine((val) => !isNaN(val), {
      message: "Input should be a number",
    }),
    email: z.string().email(),
   
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      Experience: ""
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-email</FormLabel>
              <FormControl>
                <Input placeholder="Enter the E-email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="Experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Input placeholder="Enter the Experience" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
