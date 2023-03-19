import Link from "next/link";
import { useState } from "react";
import Profile from "./LoginButton";

const Sidebar = () => {
  //   const [sidebarOpen, setSidebarOpen] = useState(false);

  const collections = [
    {
      name: "Realms",
      address: "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
    },
    {
      name: "Loot",
      address: "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7",
    },
    {
      name: "Genesis Adventurer",
      address: "0x8db687aceb92c66f013e1d614137238cc698fedb",
    },
    {
      name: "Crypts and Caverns",
      address: "0x86f7692569914b5060ef39aab99e62ec96a6ed45",
    },
  ];

  const menu_items = [
    { name: "Base", href: "/" },
    {
      name: "Realms",
      href: "/collection/0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
    },
    {
      name: "Loot",
      href: "/collection/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7",
    },
    {
      name: "GA",
      href: "/collection/0x8db687aceb92c66f013e1d614137238cc698fedb",
    },
    {
      name: "CC",
      href: "/collection/0x86f7692569914b5060ef39aab99e62ec96a6ed45",
    },
  ];

  return (
    <div className={`w-48 md:block flex-none absolute`}>
      <div className="flex flex-col mt-4 space-y-3">
        {menu_items.map((item, index) => {
          return (
            <Link
              href={item.href}
              key={index}
              className="flex justify-end w-16 p-2 transition-all duration-300 border-t border-b border-r border-white rounded-r-full hover:w-36 bg-black/40 border-white/30 group"
            >
              <span className="self-center invisible px-2 transition-all duration-300 group-hover:visible">
                {item.name}
              </span>
              <div className="justify-center flex-none w-8 h-8 rounded-full bg-white/50">
                <span></span>
              </div>
            </Link>
          );
        })}

        {/* <ul className="mt-4">
          <li className="flex flex-col mb-2">
            {collections.map((collection, index) => {
              return (
                <Link
                  key={index}
                  href={`/collection/${collection.address}`}
                  
                >
                  {collection.name}
                </Link>
              );
            })}
          </li>
          
        </ul> */}
      </div>
    </div>
  );
};

export default Sidebar;
