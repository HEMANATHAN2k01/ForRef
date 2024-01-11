import React from "react";

export const UserDataTable = (props) => {
  return (
    <div>
      <div className="overflow-x-auto mx-5">
        <table className="min-w-full bg-purple-300 border border-gray-300">
          <thead>
            <tr className="bg-gradient-to-r from-purple-800 via-purple-400 to-purple-200">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Department</th>
              <th className="py-2 px-4 border-b">Mobile number</th>
              <th className="py-2 px-4 border-b">Date of Birth</th>
              <th className="py-2 px-4 border-b">Blood</th>
              <th className="py-2 px-4 border-b">Address</th>
            </tr>
          </thead>
          <tbody>
            {props.content.datas.map((item, index) => (
              <tr key={index} className="hover:bg-purple-200">
                <td className="py-2 px-4 border-b border-r">{item.name}</td>
                <td className="py-2 px-4 border-b border-r">{item.email}</td>
                <td className="py-2 px-4 border-b border-r">{item.dept}</td>
                <td className="py-2 px-4 border-b border-r">{item.mobileno}</td>
                <td className="py-2 px-4 border-b border-r">{item.dob}</td>
                <td className="py-2 px-4 border-b border-r">{item.blood}</td>
                <td className="py-2 px-4 border-b">{item.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
