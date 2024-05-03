import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const App = () => {
  return (
    <>
      <Router>
        <div className="flex text-black">
          <Sidebar />
          {/* <HomePage/> */}
          <div className='mx-auto mt-5 w-3/4'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/Signup" element={<SignupPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
