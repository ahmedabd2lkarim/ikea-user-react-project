import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import LoginForm from "./Pages/UserForms/LoginForm"

import RegisterForm from "./Pages/UserForms/RegisterForm";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Favourite from "./Pages/Favourite/Favourite";
import Profile from "./Pages/Profile/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index:true ,
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
       path: "/signup",
        element: <RegisterForm  />, 
      },
      {
        path: "/productDetails",
         element:< ProductDetails />, 
      },
      {
        path: "/cart",
         element: <Cart/>, 
       },
       {
        path: "/favorite",
         element: <Favourite/>, 
       },
       {
        path: "/profile",
         element: <Profile/>, 
       },

    ]
  }])

function App() {

  return (
      <RouterProvider router={router} />
  );
}

export default App
