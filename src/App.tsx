import "./App.css";

/* import routers */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//  import pages
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import Product from "./pages/Product";

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
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
