// pages/index.tsx
import UserInfo from "@/components/user-info";
import { ApiUrl, Pages } from "@/types/enums";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Your YouTube Videos</h1>
      <Link href={ApiUrl.Videos}>Get number of videos</Link>
      <UserInfo/>
      <Link href={Pages.Login}>Switch user</Link>
    </div>
  );
}
