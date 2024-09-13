"use client"

import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import HFormField from '@/components/forms/HFormField';
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react';

const loginSchema = zod.object({
  email: zod
    .string({ required_error: 'Email is required'})
    .email({ message: 'Email should have valid format'}),
  password: zod
    .string({ required_error: 'Password is required'})
})

export default function LoginForm() {

  const form = useForm<zod.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, control } = form

  const onSubmit = async(sample: any) => {
    // TO DO
  }

  const { data } = useQuery({ 
    queryKey: ['yawa'], 
    queryFn: () => {
      return fetch('http://localhost:4000/api/jobs/all').then((res) => res.json())
    }  
  })

  console.log("data na yawa", data)

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
