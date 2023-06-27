import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/home";
import Register from "./Pages/register/register";
import Pricing from "./Pages/pricing/pricing";
import Login from "./Pages/login/login";
import Checkout from "./Pages/checkout/checkout";
import Forgotpassword from "./Pages/ForgetPassword/Forgetpassword";
// import ProtectedRoute from "./ProtectedRoute";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/forgetpassword" element={<Forgotpassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
