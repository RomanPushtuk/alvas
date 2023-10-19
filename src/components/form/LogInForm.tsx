"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FormData = {
  username: string;
  password: string;
};

interface LoginFormProps {
  action: (formData: FormData) => Promise<void>;
}

const LogInForm: React.FC<LoginFormProps> = ({ action }) => {
  const FormSchema = z.object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(4, {
      message: "Password must be at least 4 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      await action(form.getValues());
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4 p-10 bg-white shadow-lg">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  {...field}
                  className="border rounded-md p-2 w-full"
                />
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
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  className="border bg-white rounded-md p-2 w-full"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="w-full py-2 text-white rounded-md hover:bg-indigo-700"
          onClick={() => onSubmit}
        >
          Log in
        </Button>
      </form>
    </Form>
  );
};

export default LogInForm;
