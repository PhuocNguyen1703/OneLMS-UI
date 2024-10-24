"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { SignInSchema } from "@/lib/zod";
import { handleCredentialsSignIn } from "@/actions/authActions";
import { useDispatch } from "react-redux";
import { setModalOnClose } from "@/redux/slices/modalSlice";

const SignInForm = () => {
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    try {
      const result = await handleCredentialsSignIn(data);
      console.log(data);
      dispatch(setModalOnClose());
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form className="mt-10" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Email</FormLabel>
              <FormControl>
                <Input
                  className="h-12 rounded-[8px] text-base"
                  placeholder="Enter your email"
                  {...field}
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
            <FormItem className="mt-5">
              <FormLabel className="text-base">Password</FormLabel>
              <FormControl>
                <PasswordInput
                  className="h-12 rounded-[8px] text-base pr-10"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="mt-5 text-right text-sm font-medium">Forgot Password?</p>
        <Button className="w-full h-12 mt-10 text-base" type="submit">
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
