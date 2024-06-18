import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgetPass from "./pages/ForgetPass"
import NotFound from "./pages/NotFound"
import Layout from "./pages/Layout"
import ResetPass from "./pages/ResetPass"
import Team from "./pages/Team"
import Order from "./pages/Order"
import About from "./pages/About"
import Contact from "./pages/Contact"
import { ToastContainer } from "react-toastify"
import ConfirmEmail from "./pages/ConfirmEmail"
import ProtectedRoutes from "./components/ProtectedRouter"
function App() {

  const routes = createBrowserRouter([{
    path: "/", element: <ProtectedRoutes><Layout /></ProtectedRoutes>, children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/team", element: <Team /> },
      { path: "/orders/:orderId", element: <Order /> },
    ]
  }, { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgetPass", element: <ForgetPass /> },
  { path: "/resetPass", element: <ResetPass /> },
  { path: "/confirmEmail", element: <ConfirmEmail /> },
  { path: "*", element: <NotFound /> },
  ])

  return (
    <>
      <ToastContainer limit={1} hideProgressBar={true} autoClose={1500} position="top-right" />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
