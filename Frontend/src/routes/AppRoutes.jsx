import { Routes, Route } from "react-router-dom";
import LayoutMain from "../components/layout/Layout.main";
import Auth from "../pages/auth/Auth";
import Cart from "../pages/cart/Cart";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
