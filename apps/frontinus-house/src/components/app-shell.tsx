import Sidebar from "@/components/sidebar";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import { Outlet } from "react-router-dom";

import Header from "./header";

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <div
      className={`--font-silkscreen --font-inconsolata dark grid min-h-screen w-full bg-background md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]`}
    >
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-col">
        <Header />
        <main
          id="content"
          className={`h-full overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
