import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import LoginForm from "./Pages/UserForms/LoginForm";

import RegisterForm from "./Pages/UserForms/RegisterForm";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Profile from "./Pages/Profile/Profile";

import FavouriteWithLists from "./Pages/Favourite/FavouriteWithList'sPage/favouriteWithLists";
import EmptyListPage from "./Pages/Favourite/EmptyList/EmptyListPage";
import ListDetailsPage from "./Pages/Favourite/ListDetails/ListDitailsPage";


import store from "./Store/store";
import { Provider } from "react-redux";

import Category from "./Pages/Category/Category";


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
        element: <Profile />,
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
    ],
  },
]);



function App() {
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTA4MTBkOGM4ZjYzMWRjNDkwYTE5ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ3NTY4NzEyLCJleHAiOjE3NDc1ODY3MTJ9.QK9ukrhdd3m2COAe06DxHNiNqGfotHVP2NZ097-p75w"
  );
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    
  );
}

export default App;
