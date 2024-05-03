import React from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center">
      <h1 className="text-3xl font-bold mb-4 ">Sign Up</h1>
      <form>
      <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input type="text" id="username" name="username" className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input type="email" id="email" name="email" className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input type="password" id="password" name="password" className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="password2" className="block text-gray-700">Re-enter Password</label>
          <input type="text" id="password2" name="password2" className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign Up</button>
      </form>
      <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link></p>
    </div>
  );
};

export default SignupPage;
