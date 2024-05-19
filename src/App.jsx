import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutPage from "./layout/LayoutPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShoppingCart from "./pages/ShoppingCart";
import CheckOut from "./pages/CheckOut";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Admin from "./admin/Admin";
import ForgotPassword from "./pages/ForgotPassword";
import User from "./pages/User";
import Products from "./admin/components/pages/Products";
import MainDash from "./admin/components/MainDash/MainDash";
import Orders from "./admin/components/pages/Orders";
import Customers from "./admin/components/pages/Customers";
import CategoryQL from "./admin/components/pages/CategoryQL";
import SignUpFace from "./pages/SignUpFace";
import LoginFace from "./pages/LoginFace";
import Branch from "./admin/components/pages/Branch";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutPage></LayoutPage>}>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/shop" element={<ShopPage></ShopPage>} />
          <Route
            path="product/:slug"
            element={<ProductDetailPage></ProductDetailPage>}
          />
          <Route path="/cart" element={<ShoppingCart></ShoppingCart>} />
          <Route path="/checkout" element={<CheckOut></CheckOut>} />
          <Route path="/user/:id" element={<User></User>}></Route>
        </Route>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="/signupFace" element={<SignUpFace></SignUpFace>} />
        <Route path="/loginFace" element={<LoginFace></LoginFace>} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
        <Route element={<Admin></Admin>}>
          <Route path="/admin" element={<MainDash></MainDash>}></Route>
          <Route path="/orders" element={<Orders></Orders>}></Route>
          <Route path="/customers" element={<Customers></Customers>}></Route>
          <Route path="/products" element={<Products></Products>}></Route>
          <Route path="/categoryql" element={<CategoryQL></CategoryQL>}></Route>
          <Route path="/branch" element={<Branch></Branch>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
