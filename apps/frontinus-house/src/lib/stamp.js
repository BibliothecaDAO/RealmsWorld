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
exports.getNames = getNames;
var utils_1 = require("./utils");
var resolvedAddresses = new Map();
function getNames(addresses) {
    return __awaiter(this, void 0, void 0, function () {
        var inputMapping, resolvedAddressesKeys_1, unresolvedAddresses, data_1, res, entries, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    inputMapping = Object.fromEntries(addresses.map(function (address) { return [address, (0, utils_1.formatAddress)(address)]; }));
                    resolvedAddressesKeys_1 = Array.from(resolvedAddresses.keys());
                    unresolvedAddresses = Object.values(inputMapping).filter(function (address) { return !resolvedAddressesKeys_1.includes(address); });
                    data_1 = [];
                    if (!(unresolvedAddresses.length > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, fetch("https://stamp.fyi", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                method: "lookup_addresses",
                                params: unresolvedAddresses,
                            }),
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data_1 = (_a.sent()).result;
                    unresolvedAddresses.forEach(function (formatted) {
                        //@ts-expect-error
                        resolvedAddresses.set(formatted, data_1[formatted]);
                    });
                    _a.label = 3;
                case 3:
                    entries = Object.entries(inputMapping)
                        .map(function (_a) {
                        var address = _a[0], formatted = _a[1];
                        return [
                            address,
                            resolvedAddresses.get(formatted) || null,
                        ];
                    })
                        .filter(function (_a) {
                        var name = _a[1];
                        return name;
                    });
                    return [2 /*return*/, Object.fromEntries(entries)];
                case 4:
                    e_1 = _a.sent();
                    console.error("Failed to resolve names", e_1);
                    return [2 /*return*/, {}];
                case 5: return [2 /*return*/];
            }
        });
    });
}
