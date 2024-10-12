  "use client"

  import * as zod from 'zod';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod'
  import { Form } from '@/components/ui/form';
  import { Button } from '@/components/ui/button';
  import HFormField from './HFormField';
  import { useRouter } from 'next/navigation';
  import { useMutationAPI } from '@/hooks/useMutationAPI';
  import Icon from '../Icon';

  const loginSchema = zod.object({
    email: zod
      .string()
      .email({ message: 'Email should have valid format'}),
    password: zod
      .string({ required_error: 'Password is required'})
      .min(1, { message: 'Password is required'})
  })

  type LoginFormData = zod.infer<typeof loginSchema>

  type LoginFormProps = {
    className?: string;
  }

  export default function LoginForm({ className }: LoginFormProps) {
    const form = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: '',
        password: ''
      },
      mode: 'onChange',
      shouldUseNativeValidation: false
    });

    const { 
      handleSubmit, 
      control,
      setError,
      formState: { errors } 
    } = form

    const router = useRouter()

    const { status: signInStatus, mutate: signIn } = useMutationAPI("/auth/signin")

    const status = signInStatus === 'pending'

    const onSubmit = (value: LoginFormData) => {
      setError('root', { message: undefined })
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

            <h1 className="text-2xl font-bold text-center">Welcome to Hire Sphere</h1>

            <HFormField
              control={control}
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email here"
              disabled={status}
              onClick={() => setError('root', { message: undefined })}
            />

            <HFormField
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
              { status ? 'Loading...' :'Log in' }
            </Button>
          </form>
        </Form>

        {errors.root?.message && (
          <div className="text-red-500 text-center">
            {errors.root.message}
          </div>
        )}

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
      
          {/* MAKE THIS BUTTON NAVIGATE TO SIGNUPFORM */}
          <div>
            <span>Don't have an account?</span>
            <Button
              variant="link" 
              className="text-blue-600 p-1.5 cursor-pointer underline"
            >
              Sign up
            </Button>
          </div> 
        </>
      </div> 
    );
  }
