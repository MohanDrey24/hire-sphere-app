"use client"

import * as zod from 'zod';
import { memo } from 'react';
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
  firstName: zod.string(),
  lastName: zod.string(),
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

function SignupForm({ onClick }: SignupFormProps) {
  const router = useRouter();
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: ""
    },
    mode: 'onChange'
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
        router.refresh();
      },
      onError: () => {
        setError('root', { message: undefined })
      }
    })
  }

  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-6">
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
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Enter your First Name"
            disabled={status}
            onClick={onClick}
          />

          <HFormField 
            control={control}
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Enter your Last Name"
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
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password here"
            disabled={status}
            onClick={onClick}
          />

          <Button
            type="submit"
            variant="default"
            className="w-full h-12"
            disabled={status || !!errors.confirmPassword}
          >
            { status ? "Loading..." : "Sign Up" }
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default memo(SignupForm);