"use client"

import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../ui/form';
import HFormField from '@/components/forms/HFormField';
import { Button } from "../ui/button";
import { useMutationAPI } from "@/hooks/useMutationAPI";
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from "react";

const signupSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
  confirmPassword: zod.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords should match",
  path: ["confirmPassword"]
});

type SignupData = zod.infer<typeof signupSchema>;

type SignupFormProps = {
  className?: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
};

export default function SignupForm({ onClick, className }: SignupFormProps) {
  const router = useRouter()
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    mode: 'onChange',
    shouldUseNativeValidation: false
  })

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors }
  } = form

  const { status: signupStatus , mutate } = useMutationAPI("/auth")

  const status = signupStatus === 'pending'

  const onSubmit = (value: SignupData) => {
    mutate(value, {
      onSuccess: () => {
        // change state to login in index page
        router.push('/')
      },
      onError: () => {
        setError('root', { message: undefined })
      }
    })
  }

  return (
    <div className={className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-6"}>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-3/4 sm:max-md:w-[60%] w-[60%] space-y-6"
        >

          <h1 className="text-2xl font-bold text-center">Sign Up to Hire Sphere</h1>

          <HFormField
            control={control}
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email here"
            disabled={status}
            onClick={onClick}
          />

          <HFormField
            control={control}
            label="Password" 
            name="password"
            type="password"
            placeholder="Enter your password here"
            disabled={status}
            onClick={onClick}
          />

          <HFormField 
            control={control}
            label="Confirm Password"
            name="Confirm Password"
            type="password"
            placeholder="Re-enter your password here"
            disabled={status}
            onClick={onClick}
          />

          <Button
            type="submit"
            variant="default"
            className="w-full h-12"
            disabled={status}
          >
            { status ? "Loading..." : "Sign Up" }
          </Button>
        </form>
      </Form>
    </div>
  );
}