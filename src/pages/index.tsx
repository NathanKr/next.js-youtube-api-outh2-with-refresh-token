// pages/index.tsx
import UserInfo from "@/components/user-info";
import { ApiUrl } from "@/types/enums";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Your YouTube Videos</h1>
      <Link href={ApiUrl.Videos}>Get videos</Link>
      <UserInfo/>
    </div>
  );
}
