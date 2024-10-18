"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var general_error_1 = require("@/pages/error/general-error");
var not_found_error_1 = require("@/pages/error/not-found-error");
var react_router_dom_1 = require("react-router-dom");
//import MaintenanceError from './pages/errors/maintenance-error'
var router = (0, react_router_dom_1.createBrowserRouter)([
    // Main routes
    {
        path: "/",
        lazy: function () { return __awaiter(void 0, void 0, void 0, function () {
            var AppShell;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require("@/components/app-shell"); })];
                    case 1:
                        AppShell = _a.sent();
                        return [2 /*return*/, { Component: AppShell.default }];
                }
            });
        }); },
        errorElement: <general_error_1.default />,
        children: [
            {
                index: true,
                lazy: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {};
                                return [4 /*yield*/, Promise.resolve().then(function () { return require("@/pages/overview"); })];
                            case 1: return [2 /*return*/, (_a.Component = (_b.sent()).default,
                                    _a)];
                        }
                    });
                }); },
            },
            {
                path: "proposals",
                lazy: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {};
                                return [4 /*yield*/, Promise.resolve().then(function () { return require("@/pages/proposals"); })];
                            case 1: return [2 /*return*/, (_a.Component = (_b.sent()).default,
                                    _a)];
                        }
                    });
                }); },
                children: [],
            },
            {
                path: "proposals/:id",
                lazy: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {};
                                return [4 /*yield*/, Promise.resolve().then(function () { return require("@/pages/proposals/[id]"); })];
                            case 1: return [2 /*return*/, (_a.Component = (_b.sent()).default,
                                    _a)];
                        }
                    });
                }); },
            },
            {
                path: "rounds",
                lazy: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {};
                                return [4 /*yield*/, Promise.resolve().then(function () { return require("@/pages/rounds"); })];
                            case 1: return [2 /*return*/, (_a.Component = (_b.sent()).default,
                                    _a)];
                        }
                    });
                }); },
            },
            {
                path: "delegates",
                lazy: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {};
                                return [4 /*yield*/, Promise.resolve().then(function () { return require("@/pages/delegates"); })];
                            case 1: return [2 /*return*/, (_a.Component = (_b.sent()).default,
                                    _a)];
                        }
                    });
                }); },
            },
        ],
    },
    // Error routes
    { path: "/500", Component: general_error_1.default },
    { path: "/404", Component: not_found_error_1.default },
    //{ path: '/503', Component: MaintenanceError },
    // Fallback 404 route
    { path: "*", Component: not_found_error_1.default },
]);
exports.default = router;
