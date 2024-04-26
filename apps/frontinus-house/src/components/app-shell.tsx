import Sidebar from "@/components/sidebar";
import useIsCollapsed from "@/hooks/use-is-collapsed";

import { Outlet } from "react-router-dom";

import Header from "./header";

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <div className={`grid min-h-screen w-full bg-dark-green text-bright-yellow md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] --font-bai-jamjuree --font-karla`}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-col">
        <Header />
        <main
          id="content"
          className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
