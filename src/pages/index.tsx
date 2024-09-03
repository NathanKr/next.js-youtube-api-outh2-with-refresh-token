// pages/index.tsx
import Link from 'next/link';


export default function HomePage() {

  return (
    <div>
      <h1>Your YouTube Videos</h1>
      <Link href='/login'>Get videos</Link>
    </div>
  );
}
