"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import HFormField from "./HFormField";
import { useRouter } from "next/navigation";
import Icon from "../Icon";
import { MouseEventHandler } from "react";
import { loginSchema, LoginFormData, useLogin } from "@/lib/auth";

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
    <div className={className}>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[60%] space-y-6 sm:max-md:w-[60%] lg:w-3/4"
        >
          <h1 className="text-center text-2xl font-bold">
            Welcome to <span className="text-fuchsia-dark">Hire Sphere</span>
          </h1>

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
          <div className="flex-grow border-t border-black"></div>
          <span className="flex-shrink p-2">or</span>
          <div className="flex-grow border-t border-black"></div>
        </div>

        <Button
          className="flex space-x-2"
          variant="outline"
          disabled={status}
          onClick={navigateToGoogleRedirectURI}
        >
          <Icon
            src="/icons/google.svg"
            alt="google-icon"
            height="20px"
            width="20px"
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
