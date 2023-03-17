import { useState } from "react";

const Sidebar = () => {
  //   const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`w-64 md:block md:w-64 bg-white shadow-md `}>
      <div className="p-4">
        <h2 className="text-2xl font-bold">Menu</h2>
        <ul className="mt-4">
          <li className="mb-2">
            <a href="/collection/0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d" className="text-gray-800 hover:text-gray-600">
              Realms
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
