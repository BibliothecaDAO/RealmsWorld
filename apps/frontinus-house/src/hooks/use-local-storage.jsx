"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLocalStorage;
var react_1 = require("react");
function useLocalStorage(_a) {
    var key = _a.key, defaultValue = _a.defaultValue;
    var _b = (0, react_1.useState)(function () {
        var storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    }), value = _b[0], setValue = _b[1];
    (0, react_1.useEffect)(function () {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
    return [value, setValue];
}
