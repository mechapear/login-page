import LoginForm from './modules/LoginForm.tsx'

export default function App() {
  return (
    <>
      <section className="m-8 grid place-content-center place-items-center">
        <div className="rounded-lg p-10 shadow-md">
          <LoginForm />
        </div>
      </section>
    </>
  )
}
