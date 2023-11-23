import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProdDetailPage from "./pages/ProdDetailPage";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import store from "./redux/store/store";
import { loadUser } from "./redux/actions/userAction";
import { getCart } from "./redux/actions/cartActions";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/order/:id",
    element: <OrderDetails />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/product/:id",
    element: <ProdDetailPage />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:keyword",
    element: <Products />,
  },

  {
    path: "/profile",
    element: <Profile />,
  },

  {
    path: "/success",
    element: <Success />,
  },
]);

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    store.dispatch(getCart());
  });

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
