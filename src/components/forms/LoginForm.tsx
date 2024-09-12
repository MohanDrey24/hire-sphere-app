"use client"

import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import HFormField from '@/components/forms/HFormField';

const loginSchema = zod.object({
  email: zod.string().email().min(1, { message: 'This field is required'}),
  password: zod.string().min(1, { message: 'Password is required'})
})

export default function LoginForm() {
  const form = useForm<zod.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, control } = form

  const onSubmit = (data: any) => {
    console.log("HANDLE LOG IN LOGIC HERE")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-[1/4] sm:w-1/2 md:w-[500px] space-y-6"
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
        className="relative lg:w-[1/4] md:w-[500px] sm:w-1/2 w-1/2 flex justify-center items-center"
      >
        <div className="flex-grow border-t border-black"></div>
        <span className="flex-shrink p-2">or</span>
        <div className="flex-grow border-t border-black"></div>
      </div>

      <Button variant="outline">Continue with Google</Button>
  
      <div >
        <span>Don't have an account?</span>
        <Button className="underline text-blue-600" variant="link">Sign up</Button>
      </div>
    </div> 
  );
}
