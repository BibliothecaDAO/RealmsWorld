"use client";

import Link from "next/link";
import Profile from "./LoginButton";
import { Compass, Menu } from "lucide-react";
import { useUIContext } from "../providers/UIProvider";
import { Button } from "./ui/button";

export const TopNav = () => {
  const { isSidebarOpen, toggleSidebar } = useUIContext();
  return (
    <div className="fixed w-full p-3 pl-4 sm:pl-8 lg:pl-32 z-100">
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
        <Profile />
      </div>
    </div>
  );
};
