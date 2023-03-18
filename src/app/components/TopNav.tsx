import Link from "next/link";
import Profile from "./LoginButton";

export const TopNav = () => {
  return (
    <div className="flex justify-between w-full p-8 border border-white">
      <Link href="/">Relic </Link> <Profile />
    </div>
  );
};
