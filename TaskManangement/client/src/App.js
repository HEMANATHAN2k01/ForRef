import React from "react";
import { Signup } from "./components/Signup";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import HomeAdmin from "./components/HomeAdmin";
import HomeUser from "./components/HomeUser";
import Navigation from "./components/Navbar";
import UserData from "./components/UserData";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homeadmin" element={<HomeAdmin />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/homeuser" element={<HomeUser />} />
        <Route path="/userdata" element={<UserData />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
