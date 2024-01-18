import { FileRoute, redirect } from '@tanstack/react-router'
import Cookies from 'universal-cookie'

// create routes other than the root route using the 'FileRoute' class
export const Route = new FileRoute('/').createRoute({
  // beforeLoad will be called before the route is loaded
  beforeLoad: async () => {
    const sessionInfo = await getSessionInfo()

    // redirect to login page if the user is not logged in
    if (sessionInfo?.code !== 'VALID_TOKEN') {
      throw redirect({
        to: '/login',
        search: {
          // use the current location to power a redirect after login
          // e.g. /login?redirect=currentUrl
          redirect: location.href,
        },
      })
    }
    // pass sessionInfo to the loader as a context object
    return { sessionInfo }
  },
  loader: ({ context }) => context.sessionInfo,
  component: SuccessLogin,
})

type SessionInfo = {
  code: 'UNAUTHORIZED' | 'INVALID_TOKEN' | 'VALID_TOKEN'
  user: {
    firstName: string
    lastName: string
  }
}

async function getSessionInfo(): Promise<SessionInfo | void> {
  // get token from cookie
  const cookies = new Cookies()
  const token = cookies.get('session-token')

  // get session info from server
  try {
    return fetch('http://localhost:3000/api/session-info', {
      method: 'GET',
      headers: {
        // send token to verify the user
        authorization: token,
      },
    }).then((res) => res.json() as Promise<SessionInfo>)
  } catch (error) {
    // for debugging
    console.error('getSessionInfo error: ', { error })
  }
}

function SuccessLogin() {
  // get user's first name from loader
  const sessionInfo = Route.useLoaderData()
  const userName = sessionInfo.user.firstName

  return (
    <>
      <section className="m-2 grid place-content-center place-items-center md:m-8">
        <div className="grid grid-flow-row gap-14 rounded-2xl bg-white px-5 pb-5 pt-14 shadow-md md:grid-flow-col md:gap-4 md:p-10">
          <div className="my-auto text-center">
            <h1 className="mb-3 text-3xl font-bold text-gray-900">
              Hi, {userName}!
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
