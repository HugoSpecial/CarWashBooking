import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import SignUp from "./auth/signup";
import Home from "./home/home";
import RecoverPass from "./auth/recoverpass";
import NewPassword from "./auth/newPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recover-password" element={<RecoverPass />} />
        <Route path="/new-password" element={<NewPassword />} />
      </Routes>
    </Router>
  );
};

export default App;