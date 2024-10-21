"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppShell;
var sidebar_1 = require("@/components/sidebar");
var use_is_collapsed_1 = require("@/hooks/use-is-collapsed");
var react_router_dom_1 = require("react-router-dom");
var header_1 = require("./header");
function AppShell() {
    var _a = (0, use_is_collapsed_1.default)(), isCollapsed = _a[0], setIsCollapsed = _a[1];
    return (<div className={"--font-silkscreen --font-inconsolata dark grid min-h-screen w-full bg-background md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"}>
      <sidebar_1.default isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
      <div className="flex flex-col">
        <header_1.default />
        <main id="content" className={"h-full overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0"}>
          <react_router_dom_1.Outlet />
        </main>
      </div>
    </div>);
}
