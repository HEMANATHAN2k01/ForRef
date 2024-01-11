import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "./Navbar";


const HomeAdmin = () => {
  const [names, setNames] = useState([]);
  const [selectedUuid, setSelectedUuid] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getdata");

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

  const handleCreateTask = async () => {
    try {
      const response = await axios.post("http://localhost:8000/createtask", {
        userid: selectedUuid,
        title: taskTitle,
        description: taskDescription,
      });

      if (response.status === 200) {
        console.log("Task created successfully");
        alert("Task created successfully");
        setTaskTitle('')
        setTaskDescription('')
      } else {
        console.error("Error creating task:", response.statusText);
        setError("Error creating task. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating task:", error.message);
      setError("Error creating task. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Sidebar />
      <h1 className="text-violet-500 text-center font-bold text-4xl m-10">
        Create Task
      </h1>
      <div className="max-w-2xl mx-auto my-5 p-4 bg-white rounded shadow">
        <select
          className="w-full px-4 py-2 mb-4 border rounded"
          onChange={(e) => setSelectedUuid(e.target.value)}
        >
          <option value="">Select User</option>
          {names.map((name, index) => (
            <option key={index} value={name.uuid}>
              {name.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="w-full px-4 py-2 mb-4 border rounded"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <input
          type="text"
          className="w-full px-4 py-2 mb-4 border rounded"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />

        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleCreateTask}
        >
          Create Task
        </button>
        {error && <p className="mt-4 text-red-500">Error: {error}</p>}

        <p className="mt-4">
          Already have an account -{" "}
          <Link className="text-blue-500" to="/login">
            back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HomeAdmin;
