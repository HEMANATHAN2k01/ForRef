// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

const Sidebar = () => {
  return (
    <div className="sidebar bg-gray-800 text-white p-4">
      <ul>
        <li>
          <Link to="/" className="text-blue-300 hover:text-blue-500">Home</Link>
        </li>
        <li>
          <Link to="/about" className="text-blue-300 hover:text-blue-500">About</Link>
        </li>
        <li>
          <Link to="/contact" className="text-blue-300 hover:text-blue-500">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
