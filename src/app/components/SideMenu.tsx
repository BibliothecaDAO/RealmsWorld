import { useState } from "react";

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

  return (
    <div className={`w-64 md:block md:w-64 bg-white shadow-md `}>
      <div className="p-4">
        <h2 className="text-2xl font-bold">Menu</h2>
        <ul className="mt-4">
          <li className="mb-2 flex flex-col">
            {collections.map((collection, index) => {
              return (
                <a
                  key={index}
                  href={`/collection/${collection.address}`}
                  className="text-gray-800 hover:text-gray-600"
                >
                  {collection.name}
                </a>
              );
            })}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
