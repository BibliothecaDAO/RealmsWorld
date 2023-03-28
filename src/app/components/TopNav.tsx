"use client";

import Link from "next/link";
import Profile from "./LoginButton";
import { Input } from "@/app/components/ui/input";
import { Compass, Menu } from "lucide-react";
import { useUIContext } from "../providers/UIProvider";
import { Button } from "./ui/button";

export const TopNav = () => {
  const { isSidebarOpen, toggleSidebar } = useUIContext();
  return (
    <div className="relative w-full p-3 pl-4 sm:pl-8 lg:pl-32 z-100">
      <div className="flex justify-between ">
        <Button className="lg:hidden" onClick={toggleSidebar}>
          <Menu className="self-center" />
        </Button>

        <Link
          className="flex self-center mx-auto text-xl font-semibold sm:mr-3 sm:text-2xl font-sans-serif"
          href="/"
        >
          <Compass className="self-center mr-3" />
          <span className="hidden sm:block">Atlas </span>
        </Link>
        {/* <div className={`w-3/4 sm:w-96 self-center`}>
          <Input type="email" placeholder="Search" />
        </div> */}

        <Profile />
      </div>
    </div>
  );
};
