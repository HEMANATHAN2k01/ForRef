import React, { useState, useEffect } from "react";
import Navigation from "./Navbar";

const UserData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/datalist");
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

  const handleExport = () => {
    fetch("http://localhost:4000/exportcsv")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("CSV data:", data);
        const blob = new Blob([data], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "data.csv";
        link.click();
      })
      .catch((error) => {
        console.error("Error exporting CSV:", error);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation />

      <div className="container mx-auto p-4">
        <div className="mb-4">
          <button
            onClick={handleExport}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          >
            Export CSV
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">Error: {error}</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.uuid} className="hover:bg-purple-200">
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                  <td className="py-2 px-4 border-b">{item.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserData;
