import { Repo } from '../types/repo';

export default function RepoCard({ repo }: { repo: Repo }) {
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
    </div>
  );
}
