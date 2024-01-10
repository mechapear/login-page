import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FacebookIcon, GithubIcon, GoogleIcon } from '../modules/icons.tsx'

export type Inputs = {
  email: string
  password: string
}

const loginSchema = z
  .object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, "Password can't be less than 10 characters"),
  })
  .required()

export type LoginSchema = z.infer<typeof loginSchema>

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginSchema) => {
    console.log('data', data)

    // reset fields after submit
    reset()
  }

  console.log('errors:', errors)

  return (
    <>
      <section className="grid gap-6 p-4">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-sm text-gray-600">Log in to continue</p>
        <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900">
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              {...register('email')}
              type="text"
              placeholder="login@gmail.com"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:border-violet-600 focus:ring-violet-600"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
              {...register('password')}
              type="password"
              placeholder="**********"
              className="focus:ring-bluet-600 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:border-blue-600"
            />
            {errors.password && (
              <span className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="rounded-full bg-blue-700 px-14 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="mb-4 text-sm text-gray-600">or continue with</p>
          <button className="mx-1 rounded-full border border-gray-200 px-8 py-2 hover:border-blue-700">
            <GoogleIcon />
          </button>
          <button className="mx-1 rounded-full border border-gray-200 px-8 py-2 hover:border-blue-700">
            <GithubIcon />
          </button>
          <button className="mx-1 rounded-full border border-gray-200 px-8 py-2 hover:border-blue-700">
            <FacebookIcon />
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            Don't have an account yet? &nbsp;
            <a href="#" className="text-blue-500 hover:underline">
              Sign up here!
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
