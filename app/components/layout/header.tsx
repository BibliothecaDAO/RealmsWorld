import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Breadcrumbs } from "./breadcrumbs";
import { StarknetConnect } from "./starknet-connect";

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b px-4">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2 px-4 ">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumbs />
        </div>
        <StarknetConnect />
      </div>
    </header>
  );
}
