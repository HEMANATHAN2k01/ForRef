import React, { useState } from "react";
import { Link } from "react-router-dom";
import SVG from "../assets/undraw_new_entries_re_cffr.svg";
import { useNavigate} from 'react-router-dom'

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert("Created");
        navigate('/login');
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-violet-500 text-center font-bold text6xl m-20">
        {"<"}-- Create Account --{">"}
      </h1>
      <div className="flex justify-evenly items-center my-30">
        <div>
          <img className="max-w-xl" src={SVG} alt="-" />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
          <h1 className="text-violet-500 text-center font-bold text-4xl m-2">
              Register Here
            </h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                className="w-96 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Enter name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                className="w-full px-4 py-2 mb-2 border rounded"
                type="text"
                placeholder="Enter email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                className="w-full px-4 py-2 mb-2 border rounded"
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="block mx-auto w-40 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              type="submit"
            >
              Register
            </button>
          </form>
          <p className="mt-4 font-semibold">
            Already have an account -{" "}
            <Link className="text-blue-500" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
