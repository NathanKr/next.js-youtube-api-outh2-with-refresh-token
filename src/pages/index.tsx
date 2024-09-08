// pages/index.tsx
import { API, Pages } from '@/types/enums';
import Link from 'next/link';


export default function HomePage() {

  return (
    <div>
      <h1>Your YouTube Videos</h1>
      <Link href={API.Videos}>Get videos</Link>
    </div>
  );
}
