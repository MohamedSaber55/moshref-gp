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

function App() {

  const routes = createBrowserRouter([{
    path: "/", element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgetPass", element: <ForgetPass /> },
      { path: "/resetPass", element: <ResetPass /> },
      { path: "/team", element: <Team /> },
      { path: "/orders/:orderId", element: <Order /> },
      { path: "*", element: <NotFound /> },
    ]
  }])

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
