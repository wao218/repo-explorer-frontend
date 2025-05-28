// store/useUserStore.js
import { useState } from 'react';
import { fetchReposByUsername } from '../services/repoService';
import { Repo } from '../types/repo';

export default function useRepoStore() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRepos = async (username: string) => {
    if (!username.trim()) {
      setError('Please enter a Github username');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetchReposByUsername(username);
      setRepos(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { repos, loading, fetchRepos };
}
