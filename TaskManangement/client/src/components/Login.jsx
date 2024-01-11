import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SvgImg from "../assets/undraw_login_re_4vu2 (1).svg";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("Login successful:", data);

        const { token } = data;

        localStorage.setItem("token", token);

        if (data.role === "admin") {
          navigate("/navigation");
        } else {
          navigate("/homeuser");
        }
      } else {
        console.error("Login failed:", response.data);
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div>
      <h1 className="text-violet-500 text-center font-bold text-6xl m-20">
        Task Manager
      </h1>
      <div className="flex justify-evenly items-center my-30">
        <div>
          <img className="max-w-xl" src={SvgImg} alt="-" />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <h1 className="text-violet-500 text-center font-bold text-4xl m-2">
              Login Here
            </h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Email:
              </label>
              <input
                className="w-96 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Password:
              </label>
              <input
                className="w-96 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              type="submit"
            >
              Login
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
          <p className="mt-4 font-semibold">
            Already have an account -{" "}
            <Link className="text-blue-500" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
