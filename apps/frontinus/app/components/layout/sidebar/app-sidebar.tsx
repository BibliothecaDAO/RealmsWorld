import {
  Atom,
  Bird,
  BookOpen,
  Bot,
  Code2,
  Eclipse,
  Frame,
  History,
  LifeBuoy,
  Map,
  PieChart,
  Rabbit,
  Send,
  Settings2,
  SquareTerminal,
  Star,
  Turtle,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { StorageCard } from "./storage-card"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@realms-world/ui/components/ui/sidebar"
import { isClient } from "@/utils/env"
const data = {
  teams: [
    {
      name: "Frontinus House",
      logo: Atom,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: Eclipse,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Rabbit,
      plan: "Free",
    },
  ],
  user: {
    name: "redbeard.stark",
    email: "0x23...3533",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Proposals",
      url: "/proposals",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All",
          url: "/about",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Starred",
          url: "#",
          icon: Star,
          description: "Browse your starred prompts",
        },
      ],
    },
    {
      title: "Rounds",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
          icon: Rabbit,
          description: "Our fastest model for general use cases.",
        },
      ],
    },
    {
      title: "Delegates",
      url: "#",
      icon: Code2,
      items: [
        {
          title: "All",
          url: "#",
        },
        {
          title: "Your Profile",
          url: "#",
        },
      ],
    },
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

  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
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
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <NavMain items={data.navMain} searchResults={data.searchResults} />
        </SidebarItem>
        <SidebarItem className="mt-6">
          <SidebarLabel>Projects</SidebarLabel>
          <NavProjects projects={data.projects} />
        </SidebarItem>
        <div className="h-full">
          <SidebarItem className="mt-6">
            <SidebarLabel>Help</SidebarLabel>
            <NavSecondary items={data.navSecondary} />
          </SidebarItem>
          <SidebarItem>
            <StorageCard />
          </SidebarItem>
        </div>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}
