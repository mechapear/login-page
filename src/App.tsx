import ImageSection from './modules/ImageSection.tsx'
import LoginForm from './modules/LoginForm.tsx'

export default function App() {
  return (
    <>
      <section className="m-2 grid place-content-center place-items-center md:m-8">
        <div className="grid grid-flow-row gap-14 rounded-2xl bg-white p-5 shadow-md md:grid-flow-col md:p-10">
          <LoginForm />
          <ImageSection />
        </div>
      </section>
    </>
  )
}
