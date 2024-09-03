// pages/index.tsx
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Define the types for the video data
interface Video {
  id: string;
  snippet: {
    title: string;
  };
}

export default function HomePage() {
  // Initialize the state with an empty array of Video objects
  const [videos, setVideos] = useState<Video[]>([]);

  async function fetchVideos() {
    const res = await fetch('/api/videos');
    const data = await res.json();
    setVideos(data.items??[]);
  }

  return (
    <div>
      <h1>Your YouTube Videos</h1>
      <Link href='/login'>Login</Link>
      <br />
      <button onClick={fetchVideos}>Fetch videos</button>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            {video.snippet.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
