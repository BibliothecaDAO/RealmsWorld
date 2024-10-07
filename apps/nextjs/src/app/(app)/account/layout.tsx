import dynamic from "next/dynamic";
import { StakingMigrationModal } from "@/app/_components/modal/StakingMigrationModal";
import { PageLayout } from "@/app/_components/PageLayout";
import { SessionProvider } from "next-auth/react";

import {
  SidebarLayout,
  SidebarTrigger,
} from "@realms-world/ui/components/ui/sidebar";
//import { ModeToggle } from '@realms-world/ui/components/ui/mode-toggle';
import { cookies } from "next/headers";
import { AuthWrapper } from "./_components/AuthWrapper";
import { AppSidebar } from "./_components/sidebar/AccountSidebar";
import { cn } from "@realms-world/utils";

const SIDEBAR_STATE_COOKIE = "sidebar:state";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const NftBridgeModal = dynamic(
    () => import("@/app/_components/modal/NftBridgeModal"),
    {
      ssr: false,
    },
  );
  const sidebarState = cookies().get(SIDEBAR_STATE_COOKIE)?.value ?? "true";
  const isSidebarOpen = sidebarState === "true";

  return (
    <SessionProvider>
      <PageLayout>
        <SidebarLayout defaultOpen={isSidebarOpen}>
          <AppSidebar />
          <SidebarTrigger
            className={cn("fixed z-40 ml-3 mt-5 h-8 w-8 border sm:top-6")}
          />
          <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out">
            <AuthWrapper>{children}</AuthWrapper>
          </div>
        </SidebarLayout>
      </PageLayout>
      <StakingMigrationModal />
      <NftBridgeModal />
    </SessionProvider>
  );
}
