"use client";

import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoginFormData, loginSchema, useLogin } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Icon from "../Icon";
import HFormField from "./HFormField";

type LoginFormProps = {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

function LoginForm({ className, onClick }: LoginFormProps) {
  const router = useRouter();

  const { status: signInStatus, mutate } = useLogin();
  const status = signInStatus === "pending";

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    shouldUseNativeValidation: false,
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = (value: LoginFormData) => {
    setError("root", { message: undefined });
    mutate(value, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: () => {
        setError("root", {
          message: "Invalid Credentials",
        });
      },
    });
  };

  const navigateToGoogleRedirectURI = () => {
    router.push(process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CALLBACK_URL || "");
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center space-y-6",
        className
      )}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 space-y-6">
          <div className="flex flex-col items-center justify-center gap-2 text-2xl font-bold sm:flex-row">
            <span>Welcome to</span>
            <span className="text-fuchsia-dark font-anta">Hire Sphere</span>
          </div>

          <HFormField
            control={control}
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email here"
            disabled={status}
            onClick={() => setError("root", { message: undefined })}
          />

          <HFormField
            control={control}
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password here"
            disabled={status}
            required={true}
            onClick={() => setError("root", { message: undefined })}
          />

          <Button
            type="submit"
            variant="mintGreen"
            className="h-12 w-full"
            disabled={status}
          >
            <span className="font-bold">
              {status ? "Loading..." : "Log in"}
            </span>
          </Button>
        </form>
      </Form>

      {errors.root?.message && (
        <div className="text-center text-red-500">{errors.root.message}</div>
      )}

      <>
        <div className="relative flex w-[60%] items-center justify-center sm:max-md:w-[60%] lg:w-3/4">
          <div className="grow border-t border-black"></div>
          <span className="shrink p-2">or</span>
          <div className="grow border-t border-black"></div>
        </div>

        <Button
          className="flex cursor-pointer space-x-2"
          variant="outline"
          disabled={status}
          onClick={navigateToGoogleRedirectURI}
        >
          <Icon
            src="/icons/google.svg"
            alt="google-icon"
            height={20}
            width={20}
          />
          <p>Continue with Google</p>
        </Button>

        <div>
          <span>Don&apos;t have an account?</span>
          <Button
            variant="link"
            className="cursor-pointer p-1.5 text-blue-600 underline"
            onClick={onClick}
          >
            Sign up
          </Button>
        </div>
      </>
    </div>
  );
}

export default LoginForm;
