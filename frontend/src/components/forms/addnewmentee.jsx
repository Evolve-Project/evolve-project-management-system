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
export function Addmentee() {
  function onSubmit(values) {
    console.log(values);
  }
  const formSchema = z.object({
    firstname: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),
    lastname: z.string().min(2, {
      message: "Last Name must be at least 2 characters.",
    }),
    mail: z.string().email(),
    clgname: z.string().min(2, {
      message: "College Name must be at least 2 characters.",
    }),
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname:"",
      mail:"",
      clgname:""
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
          control={form.control}
          name="firstname"
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
          name="lastname"
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
          name="mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Enter the E-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="clgname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter The College Name" {...field} />
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
