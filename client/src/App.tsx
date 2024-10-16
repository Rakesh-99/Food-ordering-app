import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/layout/Layout";



const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./auth/Signup"));
const Login = lazy(() => import("./auth/Login"));
const ForgetPassword = lazy(() => import("./auth/ForgetPassword"));
const ResetPassword = lazy(() => import("./auth/ResetPassword"));
const VerifyOTP = lazy(() => import("./auth/VerifyOTP"));
const Profile = lazy(() => import('./pages/Profile'));
const Search = lazy(() => import('./components/Search'));
const ViewRestaurantDetails = lazy(() => import('./components/ViewRestaurantDetails'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading..</div>}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,

        element: (
          <Suspense fallback={<div>Loading..</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<div>Loading..</div>}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "forget-password",
        element: (
          <Suspense fallback={<div>Loading..</div>}>
            <ForgetPassword />
          </Suspense>
        )
      },
      {
        path: "reset-password",
        element: (
          <Suspense fallback={<div>Loading..</div>}>
            <ResetPassword />
          </Suspense>
        )
      },
      {
        path: "verify-otp",
        element: (
          <Suspense fallback={<div>Loading..</div>}>
            <VerifyOTP />
          </Suspense>
        )
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<div>Loading..</div>}>
            <Profile />
          </Suspense>
        )
      },
      {
        path: 'search/:id',
        element: (
          <Suspense fallback={<div>Loading..</div>}>
            <Search />
          </Suspense>
        )
      },
      {
        path: 'view-restaurant-details/:id',
        element: (
          <Suspense>
            <ViewRestaurantDetails />
          </Suspense>
        )
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<div>Loading..</div>}>
            <Cart />
          </Suspense>
        )
      },
      {
        path: "Checkout",
        element: (
          <Suspense fallback={<div>Loading..</div>}>
            <Checkout />
          </Suspense >
        )
      }
    ],
  },
]);


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
