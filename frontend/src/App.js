import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
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
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import AdminPage from "./pages/Admin/AdminPage";
import AdminProductsPage from "./pages/Admin/AdminProducts";
import CreateProduct from "./pages/Admin/CreateProduct";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminOrderDetails from "./pages/Admin/AdminOrderDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AdminRoutes from "./components/routes/AdminRoutes";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/order/:id"
          element={
            <ProtectedRoutes>
              <OrderDetails />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <CartPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProdDetailPage />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoutes>
              <Success />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoutes>
              <AdminPage />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoutes>
              <AdminProductsPage />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/product/new"
          element={
            <AdminRoutes>
              <CreateProduct />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/product/update/:id"
          element={
            <AdminRoutes>
              <UpdateProduct />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/orders/all"
          element={
            <AdminRoutes>
              <AdminOrders />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <AdminRoutes>
              <AdminOrderDetails />
            </AdminRoutes>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
