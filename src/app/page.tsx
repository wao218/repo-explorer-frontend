import dynamic from 'next/dynamic';

// const HomePage = dynamic(() => import('@/components/HomePage'), { ssr: false });
import HomePage from '@/components/HomePage';
export default function Home() {
  return <HomePage />;
}
