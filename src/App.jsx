import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import LoginForm from "./Pages/UserForms/LoginForm"
import { Provider } from 'react-redux';
import RegisterForm from "./Pages/UserForms/RegisterForm";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Profile from "./Pages/Profile/Profile";

import FavouriteWithLists from "./Pages/Favourite/FavouriteWithList'sPage/favouriteWithLists";
import EmptyListPage from "./Pages/Favourite/EmptyList/EmptyListPage";
import ListDetailsPage from "./Pages/Favourite/ListDetails/ListDitailsPage";

import Category from "./Pages/Category/Category";
import store from "./Store/store";
import ProfileDetails from "./Components/ProfilePages/ProfileDetails";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteProfile from "./Components/ProfilePages/DeleteProfile";
import ChangePassword from "./Components/ProfilePages/ChangePassword";
import BillingShippingForm from "./Pages/Cart/Billing Form";


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
        path: "/profile",
         element: <Profile/>, 
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
        path: "/profile/change-password",
         element: <ChangePassword/>, 
       }
       ,
       {
        path: "/category",
         element: <Category/>, 
       },
      {
        path: "/category/:id",
        element: <Category />,
      },
      {
        path: "/list-details/:listId",
        element: <ListDetailsPage />,
      },
      {
        path: "/empty-list-page/:listId",
        element: <EmptyListPage />,
      },
      {
        path: "/favourite-lists",
        element: <FavouriteWithLists />,
      },
    ]
  },
  {
    path: "/billing-shipping-form",
    element: <BillingShippingForm />,
  },
]);



function App() {
  // localStorage.setItem(
  //   "token",
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTA4MTBkOGM4ZjYzMWRjNDkwYTE5ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ3NTY4NzEyLCJleHAiOjE3NDc1ODY3MTJ9.QK9ukrhdd3m2COAe06DxHNiNqGfotHVP2NZ097-p75w"
  // );
  return (
    <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
  );
}

export default App;
