import "./App.css";

/* import routers */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//  import react-query
import { QueryClient, QueryClientProvider } from "react-query";

//  import pages
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import Product from "./pages/Product";

const client = new QueryClient();

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
    path: "/shop",
    element: <ProductsPage />,
    children: [],
  },
  {
    path: "/shop/product/:name",
    element: <Product />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
