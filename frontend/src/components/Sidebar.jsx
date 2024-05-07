import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserInfo } from "../hooks/auth";
import SkeletonSidebar from "./Skeletons/SkeletonSidebar";

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo, user } = useUserInfo();
  const [sidebarActive, setSidebarActive] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    // You can implement logic to toggle dark theme in your application here
  };

  useEffect(() => {
    userInfo()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  const handleToggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  if (isLoading) {
    return <SkeletonSidebar />;
  }

  if (!user) {
    return (
      <div className="bg-gray-800 text-white fixed top-0 w-1/6 p-4 h-screen">
        <p>Please log in to view the sidebar.</p>
      </div>
    );
  }

  return (
    <div className={`h-screen w-1/6 flex flex-col pt-8 mr-4 p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}>
      <p className='pb-2 text-xl font-semibold'>Welcome</p>
      <div className='flex items-center gap-4 font-semibold'>
        <img src={user.avatar.url}
          alt={user.username} className="w-10 h-10 rounded-full" />
        <p className='text-center'>John Doe</p>
      </div>
      <div className='flex items-center flex-col mt-4'>
        <ul>
          <li className="mb-4">
            <Link to="/" className={`block ${darkMode ? 'text-white hover:text-gray-300' : 'text-blue-500 hover:text-blue-700'}`}>Home</Link>
          </li>
          <li className="mb-4">
            <Link to="/profile" className={`block ${darkMode ? 'text-white hover:text-gray-300' : 'text-blue-500 hover:text-blue-700'}`}>Profile</Link>
          </li>
        </ul>
        <Link to="/login" className={`block ${darkMode ? 'text-red-500 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}>Logout</Link>
      </div>
      {/* Dark mode toggle */}
      <div className="mt-auto">
        <label className="flex items-center cursor-pointer">
          <span className="mr-2">Dark Mode</span>
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" checked={darkMode} onChange={toggleDarkMode} />
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
