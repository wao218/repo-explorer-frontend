import { api } from '../lib/api';
import { Repo } from '../types/repo';

export async function fetchReposByUsername(username: string) {
  return await api.get<Repo[]>(
    `https://api.github.com/users/${username}/repos`
  );
}
