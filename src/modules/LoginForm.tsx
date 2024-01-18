import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import Cookies from 'universal-cookie'
import { z } from 'zod'
import { ErrorIcon, FacebookIcon, GithubIcon, GoogleIcon } from './icons.tsx'

const loginSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(10, "Password can't be less than 10 characters"),
  })
  .required()

// extract the TypeScript type of loginSchema
export type LoginSchema = z.infer<typeof loginSchema>

export type LoginResponse = {
  isSuccess: boolean
  code: 'SUCCESS' | 'INVALID_CREDENTIALS'
  sessionToken?: string
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })
  // navigate to a route from a side-effect
  const navigate = useNavigate({ from: '/' })

  const onSubmit = async (userInput: LoginSchema) => {
    // send userInput to server
    try {
      const loginResult = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      }).then((res) => {
        return res.json() as Promise<LoginResponse>
      })

      // handle success login
      if (loginResult.isSuccess) {
        // save token to cookie
        const cookies = new Cookies()
        cookies.set('session-token', loginResult.sessionToken)

        // navigate to index page which is a success login page
        return navigate({ to: '/' })
      }

      // handle invalid credentials
      setError('root.serverError', {
        type: loginResult.code,
      })
    } catch (error) {
      // for debugging
      console.error('LoginForm / onSubmit error', { error })

      // handle internet error
      setError('root.internetError', {
        type: 'INTERNET_ERROR',
      })
    }
  }

  return (
    <>
      <section className="grid gap-7 p-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Welcome Back!
          </h1>
          <p className="text-sm text-gray-600">Log in to continue</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900">
          {/* email input */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              {...register('email')}
              type="text"
              placeholder="login@gmail.com"
              className="block w-full rounded-lg border bg-gray-50 px-3 py-2.5 text-sm focus:border-violet-600 focus:ring-violet-600"
              style={{
                borderColor: errors.email
                  ? 'rgb(239 68 68)' // tailwindcss red-500
                  : 'rgb(209 213 219)', // tailwindcss gray-300
              }}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* password input */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input
              {...register('password')}
              type="password"
              placeholder="**********"
              className="focus:ring-bluet-600 block w-full rounded-lg border bg-gray-50 px-3 py-2.5 text-sm focus:border-blue-600"
              style={{
                borderColor: errors.password
                  ? 'rgb(239 68 68)' // tailwindcss red-500
                  : 'rgb(209 213 219)', // tailwindcss gray-300
              }}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* server error */}
          {errors.root?.serverError.type === 'INVALID_CREDENTIALS' && (
            <div className="mb-5 mt-2 w-full rounded-lg border border-red-500 bg-red-50 px-3 py-2.5 text-red-500">
              <ErrorIcon />
              <span className="pl-1 text-sm">
                Invalid email or password, Please try again.
              </span>
            </div>
          )}

          {/* internet error */}
          {errors.root?.internetError.type === 'INTERNET_ERROR' && (
            <div className="mb-5 mt-2 w-full rounded-lg border border-red-500 bg-red-50 px-3 py-2.5 text-red-500">
              <ErrorIcon />
              <span className="pl-1 text-sm">
                Please check your internet and try again.
              </span>
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="rounded-full bg-blue-700 px-14 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
            >
              Log in
            </button>

            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                alert("You're redirecting to the reset password page")
              }}
              className="mt-3 block text-sm text-gray-600 hover:text-blue-500 hover:underline"
            >
              forgot password?
            </a>
          </div>
        </form>

        <div className="text-center">
          <p className="mb-4 text-sm text-gray-600">or continue with</p>
          <button
            className="mr-1 rounded-full border border-gray-200 px-6 py-2 hover:border-blue-700 md:mx-1 md:px-8
          "
            onClick={() => alert("You're logging in with Google account")}
          >
            <GoogleIcon />
          </button>
          <button
            className="mr-1 rounded-full border border-gray-200 px-6 py-2 hover:border-blue-700 md:mx-1 md:px-8"
            onClick={() => alert("You're logging in with GitHub account")}
          >
            <GithubIcon />
          </button>
          <button
            className="rounded-full border border-gray-200 px-6 py-2 hover:border-blue-700 md:mx-1 md:px-8"
            onClick={() => alert("You're logging in with Facebook account")}
          >
            <FacebookIcon />
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            Don't have an account yet? &nbsp;
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                alert("You're redirecting to the sign up page")
              }}
              className="block text-blue-500 hover:underline md:inline-block"
            >
              Sign up here!
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
