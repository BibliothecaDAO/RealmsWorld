"use client";

/*import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";*/
import { Menu } from "lucide-react";

import { Button } from "@realms-world/ui";

import { useUIContext } from "../providers/UIProvider";

export const TopNav = () => {
  //{ scrollY } = useScroll();
  //const [isScrolled, setIsScrolled] = useState(false);

  const { toggleSidebar } = useUIContext();

  /*useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });*/

  return (
    <div
      id="topnav"
      className={`fixed z-[100] w-full p-3 pl-4 sm:pl-8 md:pl-32`}
    >
      <div className="flex justify-between">
        <Button className={"flex md:hidden"} onClick={toggleSidebar}>
          <Menu className="w-8" />
        </Button>
      </div>
    </div>
  );
};
