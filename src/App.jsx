import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import LoginForm from "./Pages/UserForms/LoginForm";
import { Provider } from 'react-redux';
import RegisterForm from "./Pages/UserForms/RegisterForm";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Favourite from "./Pages/Favourite/Favourite";
import Profile from "./Pages/Profile/Profile";

import Category from "./Pages/Category/Category";
import store from "./Store/store";
import ProfileDetails from "./Components/ProfilePages/ProfileDetails";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteProfile from "./Components/ProfilePages/DeleteProfile";

import store from "./Store/store";
import { Provider } from "react-redux";

import Category from "./Pages/Category/Category";
import store from "./Store/store";
import ProfileDetails from "./Components/ProfilePages/ProfileDetails";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteProfile from "./Components/ProfilePages/DeleteProfile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <RegisterForm />,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/favorite",
        element: <Favourite />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
       {
        path: "/profile/details",
         element: <ProfileDetails/>, 
       },
       {
        path: "/profile/delete-account",
         element: <DeleteProfile/>, 
       }
       ,
       {
        path: "/category",
         element: <Category/>, 
       },
]);

function App() {

  return (
    <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
  );

}

export default App;
