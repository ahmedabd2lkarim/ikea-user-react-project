import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import LoginForm from "./Pages/UserForms/LoginForm";
import { Provider } from "react-redux";
import RegisterForm from "./Pages/UserForms/RegisterForm";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Profile from "./Pages/Profile/Profile";
import Search from "./Pages/Search/Search";
import EmptyOrNotLogin from "./Pages/Favourite/EmptyOrNotLoginFavouritePage/emptyOrNotLogin";
import FavouriteWithLists from "./Pages/Favourite/FavouriteWithList'sPage/favouriteWithLists";
import EmptyListPage from "./Pages/Favourite/EmptyList/EmptyListPage";
import ListDetailsPage from "./Pages/Favourite/ListDetails/ListDitailsPage";
import Category from "./Pages/Category/Category";
import store from "./Store/store";
import ProfileDetails from "./Components/ProfilePages/ProfileDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteProfile from "./Components/ProfilePages/DeleteProfile";
import ChangePassword from "./Components/ProfilePages/ChangePassword";
import BillingShippingForm from "./Pages/Cart/Billing Form";
import Loading from "./Components/Loading/Loading";
import NotFound from './Components/NotFound/NotFound';
import ShowOrders from "./Components/ProfilePages/ShowOrders";

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
        path: "/profile/details",
        element: <ProfileDetails />,
      },
      {
        path: "/profile/MyOrders",
        element:<ShowOrders />,
      },
      {
        path: "/profile/delete-account",
        element: <DeleteProfile />,
      },
      {
        path: "/profile/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/category",
        element: <Category />,
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
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/favourite",
        element: <EmptyOrNotLogin />,
      },
    ],
  },
  {
    path: "/billing-shipping-form",
    element: <BillingShippingForm />,
  },
  {
    path: "*",
    element: <NotFound />,
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
