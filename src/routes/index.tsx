import { FileRoute } from '@tanstack/react-router'

// create routes other than the root route using the 'FileRoute' class
export const Route = new FileRoute('/').createRoute({
  component: SuccessLogin,
})

function SuccessLogin() {
  return (
    <>
      <section className="m-2 grid place-content-center place-items-center md:m-8">
        <div className="grid grid-flow-row gap-14 rounded-2xl bg-white px-5 pb-5 pt-14 shadow-md md:grid-flow-col md:gap-4 md:p-10">
          <div className="my-auto text-center">
            <h1 className="mb-3 text-3xl font-bold text-gray-900">
              Hi, UserName!
            </h1>
            <p className="text-sm text-gray-700">
              We are happy to see you again!
            </p>
            <p className="text-sm text-gray-700">
              Let us introduce you our new updates.
            </p>
          </div>
          {/* image section */}
          <div className="grid place-items-end">
            <img
              src="/asset/image2.png"
              alt="login success image"
              className="h-auto max-h-[360px] max-w-full"
            />
          </div>
        </div>
      </section>
    </>
  )
}
