import { NotFoundRoute, Router, RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import NotFoundPage from './modules/NotFoundPage.tsx'
import { Route as rootRoute } from './routes/__root.tsx'
import { routeTree } from './routeTree.gen.ts'

import './index.css'

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFoundPage,
})

// Set up a Router instance
const router = new Router({
  routeTree,
  notFoundRoute,
  defaultPreload: 'intent',
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
