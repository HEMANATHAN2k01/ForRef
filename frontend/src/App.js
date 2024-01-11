import React from "react";
import { Signup } from "./components/Signup";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import UserData from "./components/UserData";
import User from "./components/User";
// import { Nav } from "./SampleNav";
// import { Header } from "./Header";
// import { Feature } from "./Feature";

function App() {
  return (
    <div className="font-mono">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userdata" element={<UserData />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </HashRouter>
    </div>
    // <div>
    //   <Nav />
    //   <Header />
    //   <Feature />
    // </div>
  );
}

export default App;
