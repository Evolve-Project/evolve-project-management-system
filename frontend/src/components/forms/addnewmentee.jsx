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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMentee } from "@/redux/Actions/User";

export function Addmentee() {
  const { message, error } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  function onSubmit(values) {
    console.log(values);
    dispatch(addMentee(values));
  }

  useEffect(() => {
    if (message) {
      // alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      // alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [message, error, dispatch]);
  const formSchema = z.object({
    first_name: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
      message: "Last Name must be at least 2 characters.",
    }),
    email: z.string().email(),
    University: z.string().min(2, {
      message: "College Name must be at least 2 characters.",
    }),

    password: z.string().min(2, {
      message: "password Name must be at least 2 characters.",
    }),
    home_city: z.string().min(2, {
      message: "home_city Name must be at least 2 characters.",
    }),
    dob: z.string().min(2, {
      message: "ok",
    }),
  });
  //

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      University: "",
      password: "",
      home_city: "",
      dob: "",
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter the Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="University"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter The University Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="home_city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter The City Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BOD</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Enter The dob" {...field} />
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
