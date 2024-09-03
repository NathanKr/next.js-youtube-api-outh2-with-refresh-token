// pages/login.js
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div>
      <h1>Login to YouTube</h1>
      <Link href="/api/authlogin">
        Login with Google
      </Link>
    </div>
  );
}
