'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import RepoSearch from './RepoSearch';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : true;

      if (isExpired) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    } catch {
      router.push('/login');
    }
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>Welcome to Repo Explorer!</h1>
      <RepoSearch />
    </div>
  );
}
