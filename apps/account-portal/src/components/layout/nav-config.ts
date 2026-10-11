import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  BookOpen,
  Castle,
  ClipboardPen,
  ExternalLink,
  LayoutDashboard,
  Vote,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
}

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: NavSubItem[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", url: "/", icon: LayoutDashboard }],
  },
  {
    label: "Realms",
    items: [
      {
        title: "Realms",
        url: "/realms",
        icon: Castle,
        items: [
          { title: "Your Realms", url: "/realms" },
          { title: "Starknet Bridge", url: "/realms/bridge" },
          { title: "Claim Rewards", url: "/realms/claims" },
          { title: "Eternum Season Passes", url: "https://market.realms.world" },
        ],
      },
    ],
  },
  {
    label: "LORDS",
    items: [{ title: "veLORDS staking", url: "/velords", icon: Banknote }],
  },
  {
    label: "Governance",
    items: [
      {
        title: "Delegation",
        url: "/delegate/list",
        icon: ClipboardPen,
        items: [
          { title: "Delegate List", url: "/delegate/list" },
          { title: "Your Profile", url: "/delegate/profile" },
        ],
      },
      { title: "Proposals", url: "/proposal/list", icon: Vote },
    ],
  },
  {
    label: "Information",
    items: [
      {
        title: "Quick Links",
        url: "#",
        icon: ExternalLink,
        items: [
          { title: "CoinGecko", url: "https://www.coingecko.com/en/coins/lords" },
          { title: "Merch Shop", url: "https://shop.realms.world/" },
          { title: "Discord", url: "https://discord.com/invite/realmsworld" },
          { title: "Twitter", url: "https://x.com/lootrealms" },
          { title: "Github", url: "https://github.com/bibliothecaDAO" },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          { title: "Realms.World", url: "https://realms.world" },
          { title: "Eternum", url: "https://blitz.realms.world" },
          { title: "Developer", url: "https://docs.realms.world" },
        ],
      },
    ],
  },
];

export const isExternal = (url: string) => /^https?:\/\//.test(url);

/** True when `pathname` is `url` or nested below it ("/" only matches exactly). */
export function isActivePath(pathname: string, url: string) {
  if (isExternal(url) || url === "#") return false;
  if (url === "/") return pathname === "/";
  return pathname === url || pathname.startsWith(`${url}/`);
}

const labels: Record<string, string> = {
  realms: "Realms",
  bridge: "Bridge",
  claims: "Claims",
  velords: "veLORDS",
  delegate: "Delegates",
  list: "List",
  profile: "Profile",
  proposal: "Proposals",
  "coming-soon": "Coming soon",
};

/** Breadcrumb trail derived from the pathname. */
export function getBreadcrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  return parts.map((part, i) => ({
    label: labels[part] ?? (part.length > 12 ? `${part.slice(0, 8)}…` : part),
    url: `/${parts.slice(0, i + 1).join("/")}`,
  }));
}
