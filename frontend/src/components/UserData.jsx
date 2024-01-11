import React, { useState, useEffect } from "react";
import { UserDataTable } from "./UserDataTable";

const UserData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const response = await fetch("http://localhost:8000/datalist");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        console.log("Fetched data:", result);
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Internal Server Error");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800 text-white text-center font-bold text-4xl p-4">
        Student data's
      </h1>
      <div className="container mx-auto p-2">
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      </div>
      <UserDataTable content={{ datas: data }} />
    </div>
  );
};

export default UserData;