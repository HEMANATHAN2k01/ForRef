import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const User = () => {
  const [names, setNames] = useState([]);
  const [selectedUuid, setSelectedUuid] = useState("");
  const [department, setDepartment] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateob, setDateob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getdata");

      if (response.status === 200) {
        setNames(response.data.selectResult);
        // console.log(response.data.selectResult);
      } else {
        console.error("Error fetching data:", response.statusText);
        setError("Error fetching data. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Error fetching data. Please try again later.");
    }
  };

  const handleCreateuser = async () => {
    try {
      const response = await axios.post("http://localhost:8000/createdata", {
        userid: selectedUuid,
        dept: department,
        mobileno: mobileNumber,
        dob: dateob,
        blood: bloodGroup,
        address: address,
      });

      if (response.status === 200) {
        console.log("Created successfully");
        alert("Created successfully");
        setDepartment("");
        setMobileNumber("");
        setDateob("");
        setBloodGroup("");
        setAddress("");
      } else {
        console.error("Error creating user:", response.statusText);
        setError("Error creating user. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
      setError("Error creating user. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800 text-white text-center font-bold text-4xl p-4">
        Student database
      </h1>
      <div className="max-w-2xl mx-auto my-4 p-4 bg-white rounded shadow">
        <select
          // className="w-full px-4 py-2 mb-4 border rounded"
          className="w-full rounded-md border-1 bg-transparent px-4 py-2 mb-4 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          onChange={(e) => setSelectedUuid(e.target.value)}
        >
          <option value="">Select Your Name</option>
          {names.map((name, index) => (
            <option key={index} value={name.uuid}>
              {name.name}
            </option>
          ))}
        </select>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email:
          </label>
          <input
            type="text"
            className="mb-4 block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <input
          type="text"
          className="mb-4 block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <input
          type="text"
          className="mb-4 block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="DoB"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          value={dateob}
          onChange={(e) => setDateob(e.target.value)}
        />
        <input
          type="text"
          className="mb-4 block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Blood group"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        />
        <input
          type="text"
          className="mb-4 block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        
        <button
          className="block mx-auto w-40 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleCreateuser}
        >
          Submit
        </button>

        {error && <p className="mt-4 text-red-500">Error: {error}</p>}

        <p className="mt-4">
          Already have an account -{" "}
          <Link className="text-blue-500" to="/login">
            back to login
          </Link>
        </p>
      </div>
      <div>
        <Profile />
      </div>
    </div>
  );
};

export default User;
