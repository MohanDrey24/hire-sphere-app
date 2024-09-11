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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow"
        >
          <h1 className="text-2xl font-bold text-center">Welcome to Hire Sphere</h1>

          <HFormField 
            control={control}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email here"
          />
        
          <HFormField 
            control={control}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password here"
          />

          <Button type="submit" variant="default" className="w-full">
            Log In
          </Button>
        </form>
      </Form>
    </div> 
  );
}
