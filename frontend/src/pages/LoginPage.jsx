import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="container flex justify-center flex-col mx-auto">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input type="email" id="email" name="email" className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input type="password" id="password" name="password" className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
      </form>
      <p className="mt-4">Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign up</Link></p>
    </div>
  );
};

export default LoginPage;
