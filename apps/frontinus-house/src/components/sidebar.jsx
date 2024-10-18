"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sidebar;
var menuLinks_1 = require("@/data/menuLinks");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@realms-world/ui/components/ui/button");
var card_1 = require("@realms-world/ui/components/ui/card");
function Sidebar(_a) {
    var className = _a.className, isCollapsed = _a.isCollapsed, setIsCollapsed = _a.setIsCollapsed;
    return (<div className="bg-muted/40 hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <react_router_dom_1.Link to="/" className="flex items-center gap-2 font-semibold">
            <lucide_react_1.Package2 className="h-6 w-6"/>
            <span className="">Frontinus House</span>
          </react_router_dom_1.Link>
          <button_1.Button variant="outline" className="ml-auto h-8 w-8">
            <lucide_react_1.Bell className="h-4 w-4"/>
            <span className="sr-only">Toggle notifications</span>
          </button_1.Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-2">
            {menuLinks_1.sidelinks.map(function (link) { return (<react_router_dom_1.Link to={link.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg transition-all hover:text-opacity-40">
                {link.icon}
                <span>{link.title}</span>
                {/*link.badge && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {link.badge}
              </Badge>
            )*/}
              </react_router_dom_1.Link>); })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <card_1.Card x-chunk="dashboard-02-chunk-0">
            <card_1.CardHeader className="p-2 pt-0 md:p-4">
              <card_1.CardTitle>Want To Govern?</card_1.CardTitle>
              <card_1.CardDescription>
                Purchase a Realm NFT to particpate in the governance of the Realms Autonomous World
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <button_1.Button size="sm" className="w-full">
                Realms.World
              </button_1.Button>
            </card_1.CardContent>
          </card_1.Card>
        </div>
      </div>
    </div>);
}
