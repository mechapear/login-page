import { Outlet, RootRoute } from '@tanstack/react-router'

export const Route = new RootRoute({
  component: () => (
    <>
      {/* components that will render on every page */}
      {/* outlet component renders the child routes of a parent route*/}
      <Outlet />
    </>
  ),
})
