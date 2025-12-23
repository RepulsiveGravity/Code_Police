'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../utils/api'; // Our Axios instance
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    try {
      // 1. Send login request to Backend
      const res = await api.post('/auth/login', formData);

      // 2. Save the received token in cookies
      Cookies.set('token', res.data.token, { expires: 5 });

      // 3. Redirect to Dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      // Display the error message sent by backend (e.g., "Invalid Credentials")
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}