import axios from "axios";
import React, { useEffect, useState } from "react";

function HomeUser() {
  const [taskData, setTaskData] = useState([]);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/usertasks", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      if (response.status === 200) {
        setTaskData(response.data.data);

        if (response.data.data.length > 0) {
          setUserName(response.data.data[0].name);
        }
      } else {
        console.error("Error fetching data");
        setError("Error fetching data. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Error fetching data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Time = new Date().getHours();
  var Greeting = "";
  switch (true) {
    case Time < 12:
      Greeting = "Good Morning";
      break;
    case Time < 18:
      Greeting = "Good Afternoon";
      break;
    default:
      Greeting = "Good Evening";
      break;
  }

  return (
    <div className="container mx-auto mt-8">
      <div>
        {userName && (
          <h1 className="text-3xl font-bold mb-4 text-center">
            Welcome! {userName} {Greeting}
          </h1>
        )}
      </div>

      <div className="flex space-x-2">
        {taskData.map((item, index) => (
          <div key={index} className="border w-96 p-4 mb-4">
            <div>
              <p className="text-lg mb-1">{item.title}</p>
              <p className="text-gray-700">{item.description}</p>
              <p className="text-sm text-gray-500">{item.createdat}</p>
            </div>
          </div>
        ))}
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default HomeUser;
