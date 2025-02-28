"use client";

import Link from "next/link";
import LordsIcon from "@/icons/lords.svg";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@realms-world/ui/components/ui/collapsible";
/*import { NavProjects } from "./nav-projects"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { StorageCard } from "./storage-card"
import { TeamSwitcher } from "./team-switcher"*/
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@realms-world/ui/components/ui/sidebar";
import {
  Atom,
  Bird,
  BookOpen,
  Bot,
  ChevronRight,
  Code2,
  Earth,
  Eclipse,
  Frame,
  History,
  LifeBuoy,
  Map,
  PieChart,
  Rabbit,
  Settings2,
  SquareTerminal,
  Star,
  Turtle,
  UserRoundPen,
} from "lucide-react";

import { NavMain } from "./NavMain";
import { NavSecondary } from "./NavSecondary";
import { NavUser } from "./NavUser";

export enum Layer {
  "Ethereum",
  "Starknet",
}

export const data = {
  navMain: [
    {
      title: "Assets",
      url: "/account/assets",
      icon: Earth,
      isActive: true,
      requiredWallets: [Layer.Starknet],
      items: [
        {
          title: "All",
          url: "/account/assets",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Realms",
          url: "/account/assets/realms",
          icon: Star,
          description: "Browse your starred prompts",
        },
      ],
    },
    {
      title: "Lords",
      url: "/account/lords",
      icon: LordsIcon,
      isActive: true,
      items: [
        {
          title: "veLords",
          url: "/account/lords/velords",
          icon: Rabbit,
          description: "Our fastest model for general use cases.",
          requiredWallets: [Layer.Starknet],
        },
        {
          title: "Realms Claims",
          url: "/account/lords/claim",
          icon: Rabbit,
          description: "Our fastest model for general use cases.",
          requiredWallets: [Layer.Starknet],
        },
        {
          title: "Legacy Claims",
          url: "/account/lords/legacy-claim",
          icon: Rabbit,
          description: "Our fastest model for general use cases.",
          requiredWallets: [Layer.Ethereum],
        },
      ],
    },
    {
      title: "Delegates",
      url: "/account/delegates",
      icon: UserRoundPen,
      isActive: true,
      requiredWallets: [Layer.Starknet],
      items: [
        {
          title: "All",
          url: "/account/delegates",
        },
        {
          title: "Your Profile",
          url: "/account/delegates/profile",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Docs",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Frontinus",
          url: "#",
        },
        {
          title: "Realms.World",
          url: "#",
        },
        {
          title: "Eternum",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Realms.World",
      url: "https://realms.world",
      icon: Frame,
    },
    {
      name: "Eternum",
      url: "https://eternum.realms.world",
      icon: PieChart,
    },
    {
      name: "Marketplace",
      url: "https://marketplace.realms.world",
      icon: Map,
    },
  ],
  searchResults: [
    {
      title: "Routing Fundamentals",
      teaser:
        "The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.",
      url: "#",
    },
    {
      title: "Layouts and Templates",
      teaser:
        "The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.",
      url: "#",
    },
    {
      title: "Data Fetching, Caching, and Revalidating",
      teaser:
        "Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.",
      url: "#",
    },
    {
      title: "Server and Client Composition Patterns",
      teaser:
        "When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ",
      url: "#",
    },
    {
      title: "Server Actions and Mutations",
      teaser:
        "Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.",
      url: "#",
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar className="left-[var(--site-sidemenu-width)] top-[var(--site-header-height)]">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url}>
                        <item.icon />
                        <span className="font-sans text-lg tracking-wider">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                    {item.items.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}

              {/*<SidebarItem className="mt-6">
            <SidebarLabel>Projects</SidebarLabel>
            <NavProjects projects={data.projects} />
          </SidebarItem>*/}
              {/*<SidebarItem className="mt-10">
          <SidebarLabel className="text-base">Help</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem>
        {/*<SidebarItem>
                        <StorageCard />
                    </SidebarItem>*/}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail className="[[data-side=left][data-collapsible=offcanvas]_&]:-right-[calc(var(--site-sidemenu-width)+15px)]" />
    </Sidebar>
  );
}
