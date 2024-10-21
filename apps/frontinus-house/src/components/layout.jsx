"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutBody = exports.LayoutHeader = exports.Layout = void 0;
var React = require("react");
var utils_1 = require("@realms-world/utils");
var Layout = React.forwardRef(function (_a, ref) {
    var className = _a.className, _b = _a.fadedBelow, fadedBelow = _b === void 0 ? false : _b, _c = _a.fixedHeight, fixedHeight = _c === void 0 ? false : _c, props = __rest(_a, ["className", "fadedBelow", "fixedHeight"]);
    return (<div ref={ref} className={(0, utils_1.cn)('relative flex h-full w-full flex-col', fadedBelow &&
            'after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:hidden after:h-32 after:w-full after:bg-[linear-gradient(180deg,_transparent_10%,_hsl(var(--background))_70%)] after:md:block', fixedHeight && 'md:h-svh', className)} {...props}/>);
});
exports.Layout = Layout;
Layout.displayName = 'Layout';
var LayoutHeader = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={(0, utils_1.cn)('flex h-[var(--header-height)] flex-none items-center gap-4 bg-background p-4 md:px-8', className)} {...props}/>);
});
exports.LayoutHeader = LayoutHeader;
LayoutHeader.displayName = 'LayoutHeader';
var LayoutBody = React.forwardRef(function (_a, ref) {
    var className = _a.className, fixedHeight = _a.fixedHeight, props = __rest(_a, ["className", "fixedHeight"]);
    return (<div ref={ref} className={(0, utils_1.cn)('flex-1 overflow-hidden py-6', fixedHeight && 'h-[calc(100%-var(--header-height))]', className)} {...props}/>);
});
exports.LayoutBody = LayoutBody;
LayoutBody.displayName = 'LayoutBody';
