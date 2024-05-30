import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import User from "./component/layout/Header/User";
import ProtectedRoute from "./component/Route/protectedRoute";

import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./component/Cart/Success";
import MyOrders from "./component/Order/MyOrders";
import OrderDetalis from "./component/Order/OrderDetalis";
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";
import UpdatProduct from "./component/admin/UpdatProduct";
import { OrderList } from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";

import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";

import NotFound from "./component/layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("http://localhost:5987/api/v1/stripeapikey",{withCredentials:true});
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <User user={user} />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" element={<Cart />} />

        <Route
          exact
          path="/account"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/me/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/password/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/shipping"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <Shipping />
            </ProtectedRoute>
          }
        />
      
        <Route
          exact
          path="/process/payment"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <Elements stripe={loadStripe(`${stripeApiKey}`)}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/success"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <Success />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/order/confirm"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <OrderDetalis />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true} user={user} loading={loading}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true} user={user} loading={loading}>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true} user={user} loading={loading}>
              <NewProduct />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true} user={user} loading={loading}>
              <UpdatProduct />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true} user={user} loading={loading}>
              <OrderList />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true} user={user} loading={loading}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true} user={user} loading={loading}>
              <UsersList />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true} user={user} loading={loading}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true} user={user} loading={loading}>
              <ProductReviews />
            </ProtectedRoute>
          }
        />

        <Route exact path="*"
          element={
           <NotFound/>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
