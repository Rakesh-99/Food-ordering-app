import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import Layout from "./components/layout/Layout";
import { Toaster } from "sonner";
import { useUserStore } from "./store/userStore";
import Loader from "./components/loader/Loader";

const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./auth/Signup"));
const Login = lazy(() => import("./auth/Login"));
const ForgetPassword = lazy(() => import("./auth/ForgetPassword"));
const ResetPassword = lazy(() => import("./auth/ResetPassword"));
const VerifyEmail = lazy(() => import("./auth/VerifyEmail"));
const Profile = lazy(() => import('./pages/Profile'));
const Search = lazy(() => import('./components/Search'));
const ViewRestaurantDetails = lazy(() => import('./components/ViewRestaurantDetails'));
const Cart = lazy(() => import('./components/Cart'));
const CheckoutPopupModal = lazy(() => import('./components/CheckoutPopupModal'));
// Admin pages :
const Restaurant = lazy(() => import('./pages/admin/Restaurant'));
const AvailableMenus = lazy(() => import('./pages/admin/AvailableMenus'));
const Order = lazy(() => import('./pages/admin/Order'));





// Protected routes : 

// 1. User protected routes :
const IsUserAuthenticated = ({ children }: { children: React.ReactNode }) => {

  const { isAuthenticated } = useUserStore();

  if (isAuthenticated) {
    return <Navigate to={'/'} replace />
  }
  return <>{children}</>
};


const IsUserAccessed = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />
  }
  return <>{children}</>
}


// 2. Admin protected routes : 
const IsAdmin = ({ children }: { children: React.ReactNode }) => {
  // Check if the user is available : 
  const { user } = useUserStore();
  if (!user) {
    return <Navigate to={'/'} replace />
  }
  // Check if the user is admin or not : 
  if (!user.admin) {
    return <Navigate to={'/'} replace />
  }
  return <>{children}</>
}












const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,

        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <IsUserAuthenticated>
            <Suspense fallback={<Loader />}>
              <Signup />
            </Suspense>
          </IsUserAuthenticated>
        ),
      },
      {
        path: "login",
        element: (
          //Wrapping login with ProtectedUserRoutes routes: 
          <IsUserAuthenticated>
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          </IsUserAuthenticated>
        ),
      },
      {
        path: "forget-password",
        element: (
          <Suspense fallback={<Loader />}>
            <ForgetPassword />
          </Suspense>
        )
      },
      {
        path: "reset-password",
        element: (
          <Suspense fallback={<Loader />}>
            <ResetPassword />
          </Suspense>

        )
      },
      {
        path: "verify-email",
        element: (
          <Suspense fallback={<Loader />}>
            <VerifyEmail />
          </Suspense>
        )
      },
      {
        path: 'profile',
        element: (
          <IsUserAccessed>
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          </IsUserAccessed>
        )
      },
      {
        path: 'search/:id',
        element: (
          <Suspense fallback={<Loader />}>
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
          <IsUserAccessed>
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          </IsUserAccessed>
        )
      },
      {
        path: "checkout-popup-modal",
        element: (
          <Suspense fallback={<Loader />}>
            <CheckoutPopupModal />
          </Suspense >
        )
      },

      // Admin routes 
      {
        path: 'admin/restaurant',
        element: (
          <IsAdmin>
            <Suspense fallback={<Loader />}>
              <Restaurant />
            </Suspense>
          </IsAdmin>
        )
      },
      {
        path: 'admin/available-menu',
        element: (
          <IsAdmin>
            <Suspense fallback={<Loader />}>
              <AvailableMenus />
            </Suspense>
          </IsAdmin>
        )
      },
      {
        path: 'admin/order',
        element: (
          <IsAdmin>
            <Suspense fallback={<Loader />}>
              <Order />
            </Suspense>
          </IsAdmin>
        )
      }
    ],
  },
]);



const App = () => {
  const { chekAuthByCookie } = useUserStore();



  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
