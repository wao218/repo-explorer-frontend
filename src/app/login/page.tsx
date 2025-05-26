'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleAuthMode = () => {
    setIsRegistering((prev) => !prev);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: handle log in / signup
    console.log(isRegistering ? 'Signing up...' : 'Logging in...');
  };
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded shadow-md w-full max-w-md'
      >
        <h1 className='text-2xl font-bold text-center mb-2'>Welcome!</h1>
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
  );
}
