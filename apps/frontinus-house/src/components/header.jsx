"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
var menuLinks_1 = require("@/data/menuLinks");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@realms-world/ui/components/ui/button");
var card_1 = require("@realms-world/ui/components/ui/card");
var dropdown_menu_1 = require("@realms-world/ui/components/ui/dropdown-menu");
var input_1 = require("@realms-world/ui/components/ui/input");
var sheet_1 = require("@realms-world/ui/components/ui/sheet");
function Header() {
    return (<header className="flex items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <sheet_1.Sheet>
        <sheet_1.SheetTrigger asChild>
          <button_1.Button variant="outline" className="shrink-0 md:hidden">
            <lucide_react_1.Menu className="h-5 w-5"/>
            <span className="sr-only">Toggle navigation menu</span>
          </button_1.Button>
        </sheet_1.SheetTrigger>
        <sheet_1.SheetContent className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            {menuLinks_1.sidelinks.map(function (link) { return (<react_router_dom_1.Link to={link.href} className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-bright-yellow hover:text-foreground">
                {link.icon}
                {link.title}
                {/*link.badge && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {link.badge}
              </Badge>
            )*/}
              </react_router_dom_1.Link>); })}
          </nav>
          <div className="mt-auto">
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Upgrade to Pro</card_1.CardTitle>
                <card_1.CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent>
                <button_1.Button size="sm" className="w-full">
                  Upgrade
                </button_1.Button>
              </card_1.CardContent>
            </card_1.Card>
          </div>
        </sheet_1.SheetContent>
      </sheet_1.Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative h-[3.7rem]">
            <lucide_react_1.Search className="absolute left-2.5 top-[20px] h-4 w-4 text-muted-foreground"/>
            <input_1.Input type="search" placeholder="Search..." className="h-full w-full appearance-none border-0 bg-background pl-8 shadow-none focus:ring-0 md:w-2/3 lg:w-1/3"/>
          </div>
        </form>
      </div>
      <dropdown_menu_1.DropdownMenu>
        <dropdown_menu_1.DropdownMenuTrigger asChild>
          <button_1.Button variant="outline" size="sm" className="rounded-full">
            <lucide_react_1.CircleUser className="h-5 w-5"/>
            <span className="sr-only">Toggle user menu</span>
          </button_1.Button>
        </dropdown_menu_1.DropdownMenuTrigger>
        <dropdown_menu_1.DropdownMenuContent align="end">
          <dropdown_menu_1.DropdownMenuLabel>My Account</dropdown_menu_1.DropdownMenuLabel>
          <dropdown_menu_1.DropdownMenuSeparator />
          <dropdown_menu_1.DropdownMenuItem>Settings</dropdown_menu_1.DropdownMenuItem>
          <dropdown_menu_1.DropdownMenuItem>Support</dropdown_menu_1.DropdownMenuItem>
          <dropdown_menu_1.DropdownMenuSeparator />
          <dropdown_menu_1.DropdownMenuItem>Logout</dropdown_menu_1.DropdownMenuItem>
        </dropdown_menu_1.DropdownMenuContent>
      </dropdown_menu_1.DropdownMenu>
    </header>);
}
