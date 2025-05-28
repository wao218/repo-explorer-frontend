'use client';

import { useState } from 'react';
import { Repo } from '../types/repo';
import { api } from '../lib/api';
import axios from 'axios';
import RepoCard from './RepoCard';
import useRepoStore from '../stores/repoStore';

export default function RepoSearch() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { repos, loading, fetchRepos } = useRepoStore();

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <div className='flex mb-6'>
        <input
          type='text'
          placeholder='Enter Github username'
          className='flex-grow border border-gray-300 rounded-md px-4 py-3 mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter') {
          //     fetchRepos();
          //   }
          // }}
        />
        <button
          onClick={() => fetchRepos(username.trim())}
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
