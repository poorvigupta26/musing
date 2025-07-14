import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing.tsx'
import About from './components/About.tsx'
import Blogs from './pages/Blogs.tsx'
import Contact from './pages/Contact.tsx'

const appRoutes= createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Landing/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/blogs",
        element:<Blogs/>
      },
      {
        path:"/contact",
        element:<Contact/>
      }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={appRoutes}>
  </RouterProvider>
)
