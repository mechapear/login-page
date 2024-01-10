import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

export default function App() {
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
      <h1>Welcome Back!</h1>
      <p>Log in to continue</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input
            {...register('email')}
            type="text"
            placeholder="login@gmail.com"
            className="rounded border border-gray-200"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <div>
          <label>Password</label>
          <input
            {...register('password')}
            type="password"
            placeholder="**********"
            className="rounded border border-gray-200"
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <div>
          <button
            type="submit"
            className="rounded-lg border border-gray-200 p-1.5"
          >
            Login
          </button>
          <button
            type="button"
            className="rounded-lg border border-gray-200 p-1.5"
          >
            Forgot password
          </button>
        </div>
      </form>
      <div>
        <p>or continue with</p>
        <button className="rounded-lg border border-gray-200 p-1.5">
          Google
        </button>
        <button className="rounded-lg border border-gray-200 p-1.5">
          github
        </button>
        <button className="rounded-lg border border-gray-200 p-1.5">
          Facebook
        </button>
      </div>
      <div>
        <p>
          Don't have an account yet? &nbsp;
          <a href="#" className="text-blue-500">
            Sign up here!
          </a>
        </p>
      </div>
    </>
  )
}
