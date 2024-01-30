import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { Fragment } from "react";
import ProductSinglePage from "./pages/ProductSinglePage";
import CartPage from "./pages/Cart";
import Categories from "./pages/Categories";
import CategoryProductPage from "./pages/CategoryProductPage";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import ForgetPass from "./pages/ForgetPass";
import Terms from "./pages/Terms";
import UserProfile from "./pages/UserProfile";
import ResetPassword from "./pages/ResetPassword";
import UserAdress from "./pages/UserAdress";
import ProfileInfo from "./pages/ProfileInfo";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductSinglePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:category" element={<CategoryProductPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forget" element={<ForgetPass />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/account" element={<UserProfile />} />
            <Route path="/account/info" element={<ProfileInfo />} />
            <Route path="/account/resetPassword" element={<ResetPassword />} />
            <Route path="/account/userAdress" element={<UserAdress />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
