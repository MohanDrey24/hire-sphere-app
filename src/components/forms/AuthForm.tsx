  "use client"

  import * as zod from 'zod';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod'
  import { Form } from '@/components/ui/form';
  import { Button } from '@/components/ui/button';
  import HFormField from '@/components/forms/HFormField';
  import { useRouter } from 'next/navigation';
  import { useMutationAPI } from '@/hooks/useMutationAPI';
  import Icon from '../Icon';

  const loginSchema = zod.object({
    email: zod
      .string({ required_error: 'Email is required'})
      .email({ message: 'Email should have valid format'}),
    password: zod
      .string({ required_error: 'Password is required'})
  })

  type AuthFormData = zod.infer<typeof loginSchema>

  type AuthFormProps = {
    className?: string;
    isLoginPage: boolean;
    setIsLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
  }

  export default function AuthForm({ className, isLoginPage, setIsLoginPage }: AuthFormProps) {
    const form = useForm<AuthFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: '',
        password: ''
      }
    });

    const { 
      handleSubmit, 
      control,
      register,
      setError,
      formState: { errors } 
    } = form

    const router = useRouter()

    const { status: signInStatus, mutate: signIn } = useMutationAPI("/auth/signin")

    const { status: signUpStatus , mutate: signUp } = useMutationAPI("/auth")

    const status = signInStatus === 'pending' || signUpStatus === 'pending'

    const onSubmit = (value: AuthFormData) => {
      setError('root', { message: undefined })
      if (isLoginPage) {
        signIn(value, {
          onSuccess: () => {
            router.push("/dashboard")
          },
          onError: () => {
            setError("root", {
              message: "Invalid Credentials"
            })
          }
        })
      } else {
        signUp(value, {
          onSuccess: () => {
            setIsLoginPage(true)
          },
          onError: () => {
            setError('root', { message: undefined })
          }
        })
      }
    }

    const navigateToGoogleRedirectURI = () => {
      router.push(process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CALLBACK_URL || '')
    }

    return (
      <div className={className}>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:w-3/4 sm:max-md:w-[60%] w-[60%] space-y-6"
          >

            <h1 className="text-2xl font-bold text-center">{ isLoginPage ? "Welcome to Hire Sphere" : "Sign Up to Hire Sphere" }</h1>

            <HFormField
              {...register("email")}
              control={control}
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email here"
              disabled={status}
              onClick={() => setError('root', { message: undefined })}
            />

            <HFormField
              {...register("password")}
              control={control}
              label="Password" 
              name="password"
              type="password"
              placeholder="Enter your password here"
              disabled={status}
              onClick={() => setError('root', { message: undefined })}
            />

            <Button
              type="submit"
              variant="default"
              className="w-full h-12"
              disabled={status}
            >
              { status ? 'Loading...' : isLoginPage ? 'Log in' : 'Sign Up' }
            </Button>
          </form>
        </Form>

        {errors.root?.message && (
          <div className="text-red-500 text-center">
            {errors.root.message}
          </div>
        )}

      { isLoginPage && 
        <>
          <div className="relative lg:w-3/4 sm:max-md:w-[60%] w-[60%] flex justify-center items-center">
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
              src='/icons/google.svg'
              alt='google-icon'
              height='20px'
              width='20px'
            />
            <p>Continue with Google</p>
          </Button>
      
          <div>
            <span>Don't have an account?</span>
            <Button
              variant="link" 
              className="text-blue-600 p-1.5 cursor-pointer underline"
              onClick={() => setIsLoginPage(false)}
            >
              Sign up
            </Button>
          </div> 
        </>
      }
      </div> 
    );
  }
