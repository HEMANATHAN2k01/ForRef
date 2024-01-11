import axios from "axios";
import React, { useEffect, useState } from "react";

function Profile() {
    
  const [taskData, setTaskData] = useState([]);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState('')
  const [dept, setDept] = useState("");
  const [mobileNumber, setMobileNumber] = useState('')
  const [dateob, setDateob] = useState('')
  const [blood ,setBlood] = useState('')
  const [address, setAddress] = useState('')

  const fetchData = async () => {

    

    try {
      const response = await axios.get("http://localhost:8000/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      if (response.status === 200) {
        setTaskData(response.data.data);
        console.log(response.data.data);
        if (response.data.data.length > 0) {
          setUserName(response.data.data[0].name);
          setEmail(response.data.data[0].email)
          setDept(response.data.data[0].dept);
          setMobileNumber(response.data.data[0].mobileno)
          setDateob(response.data.data[0].dob)
          setBlood(response.data.data[0].blood)
          setAddress(response.data.data[0].address)
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
    case Time < 16:
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
      <p className="text-lg mb-1">{email}</p><br />
      <p className="text-lg mb-1">{dept}</p><br />
      <p className="text-lg mb-1">{mobileNumber}</p><br />
      <p className="text-lg mb-1">{dateob}</p><br />
      <p className="text-lg mb-1">{blood}</p><br />
      <p className="text-lg mb-1">{address}</p>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Profile;
