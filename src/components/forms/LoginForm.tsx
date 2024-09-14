"use client"

import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import HFormField from '@/components/forms/HFormField';
import { useMutation } from '@tanstack/react-query'

const loginSchema = zod.object({
  email: zod
    .string({ required_error: 'Email is required'})
    .email({ message: 'Email should have valid format'}),
  password: zod
    .string({ required_error: 'Password is required'})
})

type LoginFormData = zod.infer<typeof loginSchema>

export default function LoginForm() {
  const form = useForm<zod.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { handleSubmit, control } = form

  // make a reusable composable for fecth and useMutation
  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await fetch("http://localhost:4000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }
      return response.json();
    }
  });

  const onSubmit = (value: LoginFormData) => {
    mutation.mutate(value, {
      onSuccess: (data) => {
        // dapat mu redirect ug lain na page
        console.log("Successfully signed in", data);
      },
      onError: (error) => {
        // dapat mu show error handling 
        console.error("Error signing in", error);
      }
    });
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-[1/4] md:w-[500px] sm:w-1/2 w-3/4 space-y-6"
        >
          <h1 className="text-2xl font-bold text-center">Welcome to Hire Sphere</h1>

          <HFormField
            control={control}
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email here"
          />
        
          <HFormField
            control={control}
            label="Password" 
            name="password"
            type="password"
            placeholder="Enter your password here"
          />

          <Button type="submit" variant="default" className="w-full">
            Log In
          </Button>
        </form>
      </Form>

      <div 
        className="relative lg:w-[1/4] md:w-[500px] sm:w-1/2 w-3/4 flex justify-center items-center"
      >
        <div className="flex-grow border-t border-black"></div>
        <span className="flex-shrink p-2">or</span>
        <div className="flex-grow border-t border-black"></div>
      </div>

      <Button variant="outline">Continue with Google</Button>
  
      <div>
        <span>Don't have an account?</span>
        <Button className="underline text-blue-600" variant="link">Sign up</Button>
      </div>
    </div> 
  );
}
