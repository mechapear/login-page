export default function NotFoundPage() {
  return (
    <>
      <section className="m-2 grid place-content-center place-items-center md:m-8">
        <div className="grid grid-flow-row gap-14 rounded-2xl bg-white px-5 pb-5 pt-14 shadow-md md:grid-flow-col md:gap-4 md:p-10">
          <div className="my-auto text-center">
            <h1 className="mb-3 text-3xl font-bold text-gray-900">
              So sorry,{' '}
            </h1>
            <p className="mb-3 text-sm text-gray-700">
              The page you're looking for can not be found
            </p>
          </div>
          {/* image section */}
          <div className="grid place-items-end">
            <img
              src="/asset/image3.png"
              alt="page not found image"
              className="h-auto max-h-[360px] max-w-full"
            />
          </div>
        </div>
      </section>
    </>
  )
}
