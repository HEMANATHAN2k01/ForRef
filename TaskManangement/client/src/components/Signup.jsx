import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navbar";
// import { useNavigate} from 'react-router-dom'

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert("Created");
        // navigate('/login');
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <h2 className="text-violet-500 text-center font-bold text-4xl m-10">Create New User</h2>
      <div className="max-w-2xl mx-auto my-5 p-4 bg-white rounded shadow">
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-600">
              Name
              <input
                className="w-full px-4 py-2 mb-2 border rounded"
                type="text"
                placeholder="Enter name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-600">
              Email
              <input
                className="w-full px-4 py-2 mb-2 border rounded"
                type="text"
                placeholder="Enter email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-600">
              Password
              <input
                className="w-full px-4 py-2 mb-2 border rounded"
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
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
  );
};
