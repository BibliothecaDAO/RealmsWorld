import dynamic from "next/dynamic";
//import { ModeToggle } from '@realms-world/ui/components/ui/mode-toggle';
import { cookies } from "next/headers";
import { StakingMigrationModal } from "@/app/_components/modal/StakingMigrationModal";
import { PageLayout } from "@/app/_components/PageLayout";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@realms-world/ui/components/ui/sidebar";
import { cn } from "@realms-world/utils";
import { SessionProvider } from "next-auth/react";

import { AuthWrapper } from "./_components/AuthWrapper";
import { AppSidebar } from "./_components/sidebar/AccountSidebar";

const SIDEBAR_STATE_COOKIE = "sidebar:state";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const NftBridgeModal = dynamic(
    () => import("@/app/_components/modal/NftBridgeModal"),
  );
  const sidebarState =
    (await cookies()).get(SIDEBAR_STATE_COOKIE)?.value ?? "false";
  const isSidebarOpen = sidebarState !== "true";

  return (
    <SessionProvider>
      <PageLayout>
        <SidebarProvider defaultOpen={isSidebarOpen}>
          <AppSidebar />
          <SidebarTrigger
            className={cn(
              "fixed top-24 z-30 ml-3 h-8 w-8 border sm:left-[98px] sm:top-5 sm:z-50",
            )}
          />
          <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out">
            <AuthWrapper>{children}</AuthWrapper>
          </div>
        </SidebarProvider>
      </PageLayout>
      <StakingMigrationModal />
      <NftBridgeModal />
    </SessionProvider>
  );
}
