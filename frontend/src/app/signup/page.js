'use client'; // Required for Next.js App Router forms

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../utils/api';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    cfHandle: '',
  });
  const [error, setError] = useState('');

  const { email, password, cfHandle } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your backend
      const res = await api.post('/auth/signup', formData);

      // Save token in cookie (valid for 5 days)
      Cookies.set('token', res.data.token, { expires: 5 });

      // Redirect to Dashboard
      router.push('/dashboard');
    } catch (err) {
      // Handle errors (like "User already exists")
      setError(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Join Coding Reminder
        </h2>
        
        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}

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

          <div className="mb-4">
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

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Codeforces Handle</label>
            <input
              type="text"
              name="cfHandle"
              value={cfHandle}
              onChange={onChange}
              placeholder="e.g. tourist"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-500">Log In</Link>
        </p>
      </div>
    </div>
  );
}