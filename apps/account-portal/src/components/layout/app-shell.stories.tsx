import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { DashboardStats } from "../modules/homepage/dashboard-stats";
import { SectionCard } from "../ui/section-card";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./header";
import { NavUserView } from "./nav-user";
import { PageContainer } from "./page-container";
import { PageHeader } from "./page-header";

function Shell({
  defaultOpen = true,
  connected = true,
}: {
  defaultOpen?: boolean;
  connected?: boolean;
}) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="[--header-height:calc(--spacing(14))]"
    >
      <AppSidebar
        footer={
          <NavUserView
            address={
              connected
                ? "0x04a1c0f3b2e8d7c6a5b4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d49c2e"
                : undefined
            }
            connectorName="Argent X"
            explorerUrl="https://voyager.online"
            onConnect={fn()}
            onCopy={fn()}
            onDisconnect={fn()}
          />
        }
      />
      <SidebarInset>
        <SiteHeader />
        <PageContainer>
          <PageHeader
            className="mb-0"
            eyebrow="Account"
            title="Dashboard"
            description="Your Realms, LORDS, rewards and governance across Ethereum and Starknet."
          />
          <DashboardStats
            realmsL1={3}
            realmsL2={7}
            lordsL1="12.4K"
            lordsL2="48.2K"
            lordsStaked="124.5K"
          />
          <SectionCard title="Recent proposals" description="Page content area." />
        </PageContainer>
      </SidebarInset>
    </SidebarProvider>
  );
}

const meta = {
  title: "Layout/App shell",
  component: Shell,
  parameters: { layout: "fullscreen" },
  args: { defaultOpen: true, connected: true },
} satisfies Meta<typeof Shell>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {};
export const Collapsed: Story = { args: { defaultOpen: false } };
export const Disconnected: Story = { args: { connected: false } };
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
