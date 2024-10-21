"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useIsCollapsed;
var react_1 = require("react");
var use_local_storage_1 = require("@/hooks/use-local-storage");
function useIsCollapsed() {
    var _a = (0, use_local_storage_1.default)({
        key: 'collapsed-sidebar',
        defaultValue: false,
    }), isCollapsed = _a[0], setIsCollapsed = _a[1];
    (0, react_1.useEffect)(function () {
        var handleResize = function () {
            // Update isCollapsed based on window.innerWidth
            setIsCollapsed(window.innerWidth < 768 ? false : isCollapsed);
        };
        // Initial setup
        handleResize();
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
        // Cleanup event listener on component unmount
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, [isCollapsed, setIsCollapsed]);
    return [isCollapsed, setIsCollapsed];
}
