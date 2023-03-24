import Link from "next/link";
import Profile from "./LoginButton";
import { Input } from "@/app/components/ui/input";
import { Compass } from "lucide-react";

export const TopNav = () => {
  return (
    <div className="relative w-full p-3 pl-4 sm:pl-8 md:pl-32 z-100">
      <div className="flex justify-between ">
        <Link
          className="flex self-center mr-3 text-xl font-semibold sm:text-2xl font-sans-serif"
          href="/"
        >
          <Compass className="self-center mr-3" />
          Atlas{" "}
        </Link>
        <div className={`w-3/4 sm:w-96 self-center`}>
          <Input type="email" placeholder="Search" />
        </div>

        <Profile />
      </div>
    </div>
  );
};
