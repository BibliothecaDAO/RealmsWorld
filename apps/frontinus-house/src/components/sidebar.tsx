import { sidelinks } from "@/data/menuLinks";
import { Bell, Package2 } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@realms-world/ui";

// interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
//   isCollapsed: boolean;
//   setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
// }

export default function Sidebar() {
  return (
    <div className="bg-muted/40 hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Frontinus House</span>
          </Link>
          <Button variant="outline" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-2">
            {sidelinks.map((link) => (
              <Link
                to={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg transition-all hover:text-opacity-40"
              >
                {link.icon}
                <span>{link.title}</span>
                {/*link.badge && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {link.badge}
                  </Badge>
                )*/}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Want To Govern?</CardTitle>
              <CardDescription>
                Purchase a Realm NFT to particpate in the governance of the Realms Autonomous World
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Realms.World
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
