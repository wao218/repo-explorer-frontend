'use client';

import { useState } from 'react';
import { Repo } from '../types/repo';
import { api } from '../lib/api';
import axios from 'axios';
import RepoCard from './RepoCard';

export default function RepoSearch() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = async () => {
    if (!username.trim()) {
      setError('Please enter a Github username');
      return;
    }

    setLoading(true);
    setError(null);
    setRepos([]);

    try {
      const response = await api.get<Repo[]>(
        `https://api.github.com/users/${username}/repos`
      );
      setRepos(response.data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('User not found');
        } else {
          setError('Failed to fetch repositories');
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <div className='flex mb-6'>
        <input
          type='text'
          placeholder='Enter Github username'
          className='flex-grow border border-gray-300 rounded-md px-4 py-3 mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fetchRepos();
            }
          }}
        />
        <button
          onClick={fetchRepos}
          disabled={loading}
          className='bg-blue-600 text-white px-6 py-3 rounded-md disabled:opacity-50 hover:bg-blue-700 transition'
        >
          search
        </button>
      </div>

      {loading && <p className='text-center text-gray-600'>Loading repos...</p>}
      {error && <p className='text-center text-red-600'>{error}</p>}

      <ul className='space-y-6'>
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </ul>
    </div>
  );
}
