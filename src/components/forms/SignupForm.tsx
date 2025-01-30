"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import HFormField from "@/components/forms/HFormField";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { signupSchema, SignupData, useRegisterUser } from "@/lib/auth";

type SignupFormProps = {
  className?: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
};

function SignupForm({ onClick }: SignupFormProps) {
  const router = useRouter();

  const { status: signupStatus, mutate } = useRegisterUser();
  const status = signupStatus === "pending";

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = (value: SignupData) => {
    mutate(value, {
      onSuccess: () => {
        router.refresh();
      },
      onError: () => {
        setError("root", { message: undefined });
      },
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-6 lg:w-1/2">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[60%] space-y-6 sm:max-md:w-[60%] lg:w-3/4"
        >
          <div className="flex flex-col items-center justify-center gap-2 text-2xl font-bold sm:flex-row">
            <span>Welcome to</span>
            <span className="text-fuchsia-dark">Hire Sphere</span>
          </div>

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
            className="h-12 w-full"
            disabled={status || !!errors.confirmPassword}
          >
            {status ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignupForm;
