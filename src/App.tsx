import "./App.css";

/* import routers */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//  import react-query
import { QueryClient, QueryClientProvider } from "react-query";

//  import pages
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import Product from "./pages/Product";
import AddressBook from "./pages/Account/AddressBook";
import Payment from "./pages/Account/Payment";
// import Returns from "./pages/Account
import Account from "./pages/Account/Account";

//  react auth kit config
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Authentication/Login";

import axios from "axios";
import createRefresh from "react-auth-kit/createRefresh";

//  shadcn sonner
import { Toaster } from "@/components/ui/sonner";
import Register from "./pages/Authentication/Register";
import SearchPage from "./pages/SearchPage";
import AccountManagement from "./pages/Account/Profile";

const client = new QueryClient();

//  create store provider

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/home",
    element: <Homepage />,
  },
  {
    path: "/shop/search",
    element: <SearchPage />,
  },
  {
    path: "/shop",
    element: <ProductsPage />,
    children: [],
  },
  {
    path: "/shop/:categories",
    element: <ProductsPage />,
  },
  {
    path: "/shop/product/:name",
    element: <Product />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/account",
    element: <AccountManagement />,
    children: [
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/account/profile",
        element: <Account />,
      },
      {
        path: "/account/address-book",
        element: <AddressBook />,
      },
      {
        path: "/account/payment",
        element: <Payment />,
      },
    ],
  },
]);

function App() {
  // const axios = useAuthAxios();
  const store = createStore({
    authName: "auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: false,
    refresh: createRefresh({
      interval: 45 * 1000,
      refreshApiCallback: async (param) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
            param,
            {
              headers: {
                Authorization: `Bearer ${param.authToken}`,
              },
            }
          );
          return {
            isSuccess: true,
            newAuthToken: response.data.access,
            newAuthTokenExpiresIn: 60,
            newRefreshTokenExpiresIn: 24 * 60 * 60,
          };
        } catch {
          return {
            isSuccess: false,
            newAuthToken: "",
            newAuthTokenExpiresIn: 0,
            newRefreshTokenExpiresIn: 0,
          };
        }
      },
    }),
  });

  return (
    <QueryClientProvider client={client}>
      <AuthProvider store={store}>
        <RouterProvider router={routes}></RouterProvider>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
