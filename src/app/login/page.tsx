'use client';

import { useState } from 'react';
import { api } from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const toggleAuthMode = () => {
    setIsRegistering((prev) => !prev);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint = isRegistering ? '/auth/register' : '/auth/login';
      const response = await api.post(endpoint, { email, password });
      const token = response.data.access_token;
      localStorage.setItem('token', token);

      // Redirect or set auth state here
      console.log('Login Successful');
      console.log('token', token);
      router.push('/');
    } catch (err: any) {
      console.log('Auth failed:', err?.response?.data?.message || err.message);
      alert('Authentication failed');
    }
  };
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='w-full max-w-md px-4'>
        <h1 className='text-4xl font-extrabold text-center text-gray-800 mb-8'>
          Repo Explorer
        </h1>
        <form
          onSubmit={handleSubmit}
          className='bg-white p-8 rounded shadow-md w-full max-w-md'
        >
          <h2 className='text-2xl font-bold text-center mb-2'>Welcome!</h2>
          <p className='text-center text-sm mb-6'>
            {isRegistering
              ? 'Already have an account?'
              : "Don't have an account yet?"}{' '}
            <button
              type='button'
              onClick={toggleAuthMode}
              className='text-blue-600 hover:text-blue-800'
            >
              {isRegistering ? 'Login' : 'Sign up'}
            </button>
          </p>

          <input
            type='email'
            placeholder='email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
          >
            {isRegistering ? 'Sign up' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
