import { useState } from 'react';
import { api } from '../lib/api';
import { Repo } from '../types/repo';

export default function RepoCard({ repo }: { repo: Repo }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to save repos.');
      return;
    }

    try {
      setIsSaving(true);
      await api.post(
        '/user/favorites',
        {
          repoId: repo.id,
          name: repo.name,
          description: repo.description,
          url: repo.url,
          language: repo.language,
          starCount: repo.stargazers_count,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSaved(true);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to save repo.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-800'>
      <h2 className='text-xl font-semibold text-blue-600'>
        <a href={repo.url} target='_blank' rel='noopener noreferrer'>
          {repo.name}
        </a>
      </h2>
      <p className='text-sm text-gray-600 dark:text-gray-300'>
        {repo.description}
      </p>
      <div className='flex justify-between text-sm mt-2'>
        <span>⭐ {repo.stargazers_count}</span>
        <span>{repo.language}</span>
      </div>
      <button
        onClick={handleSave}
        disabled={isSaving || saved}
        className={`mt-2 px-3 py-1 rounded-md text-white ${
          saved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
        } disabled:opacity-50`}
      >
        {saved ? 'Saved' : isSaving ? 'Saving...' : 'Save to Favorites'}
      </button>
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
}
