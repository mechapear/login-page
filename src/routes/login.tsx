import { FileRoute } from '@tanstack/react-router'
import ImageSection from '../modules/ImageSection.tsx'
import LoginForm from '../modules/LoginForm.tsx'

// create routes other than the root route using the 'FileRoute' class
export const Route = new FileRoute('/login').createRoute({
  component: LoginPage,
})

function LoginPage() {
  return (
    <section className="m-2 grid place-content-center place-items-center md:m-8">
      <div className="grid grid-flow-row gap-14 rounded-2xl bg-white p-5 shadow-md md:grid-flow-col md:p-10">
        <LoginForm />
        <ImageSection />
      </div>
    </section>
  )
}
