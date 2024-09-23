"use client"

import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import HFormField from '@/components/forms/HFormField';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutationAPI } from '@/hooks/useMutationAPI';
import Icon from '../Icon';

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

  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState('')

  const { status, mutate } = useMutationAPI("/auth/signin")

  const onSubmit = (value: LoginFormData) => {
    setErrorMessage('')
    mutate(value, {
      onSuccess: () => {
        router.push('/dashboard')
      },
      onError: () => {
        setErrorMessage('Invalid credentials')
      }
    })
  }

  const isLoading = status === 'pending'

  const navigateToGoogleRedirectURI = () => {
    if (process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CALLBACK_URL) {
      router.push(process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CALLBACK_URL)
    } else {
      console.error("Redirect URI not defined")
    }
  }

  const resetErrorMessage = () => {
    setErrorMessage('')
  }

  return (
    <div className="w-[40%] flex flex-col items-center justify-center min-h-screen space-y-6">
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
            disabled={isLoading}
            onClick={resetErrorMessage}
          />
        
          <HFormField
            control={control}
            label="Password" 
            name="password"
            type="password"
            placeholder="Enter your password here"
            disabled={isLoading}
            onClick={resetErrorMessage}
          />

          <Button type="submit" variant="default" className="w-full" disabled={isLoading}>
            { isLoading ? 'Loading...' : 'Log In' }
          </Button>
        </form>
      </Form>

      {errorMessage && (
        <div className="text-red-500 text-center">
          {errorMessage}
        </div>
      )}

      <div 
        className="relative lg:w-[1/4] md:w-[500px] sm:w-1/2 w-3/4 flex justify-center items-center"
      >
        <div className="flex-grow border-t border-black"></div>
        <span className="flex-shrink p-2">or</span>
        <div className="flex-grow border-t border-black"></div>
      </div>

      <Button className="flex space-x-2" variant="outline" disabled={isLoading} onClick={navigateToGoogleRedirectURI}>
        <Icon 
          src='/icons/google.svg'
          alt='google-icon'
          height='20px'
          width='20px'
        />
        <p>Continue with Google</p>
      </Button>
  
      <div className="">
        <span>Don't have an account?</span>
        <a className="text-blue-600 p-1.5 cursor-pointer underline">Sign up</a>
      </div>
    </div> 
  );
}
