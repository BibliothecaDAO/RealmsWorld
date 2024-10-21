"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = request;
exports.batchRequest = batchRequest;
exports.getBalance = getBalance;
exports.getTokenBalances = getTokenBalances;
exports.getTokensMetadata = getTokensMetadata;
exports.getBalances = getBalances;
var constants_1 = require("@/data/constants");
__exportStar(require("./types"), exports);
var apiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
var NETWORKS = {
    1: "eth-mainnet",
    5: "eth-goerli",
    11155111: "eth-sepolia",
    10: "opt-mainnet",
    137: "polygon-mainnet",
    42161: "arb-mainnet",
};
function getApiUrl(networkId) {
    var _a;
    var network = (_a = NETWORKS[networkId]) !== null && _a !== void 0 ? _a : "mainnet";
    return "https://".concat(network, ".g.alchemy.com/v2/").concat(apiKey);
}
function request(method, params, networkId) {
    return __awaiter(this, void 0, void 0, function () {
        var res, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(getApiUrl(networkId), {
                        method: "POST",
                        body: JSON.stringify({
                            id: 1,
                            jsonrpc: "2.0",
                            method: method,
                            params: params,
                        }),
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    result = (_a.sent()).result;
                    return [2 /*return*/, result];
            }
        });
    });
}
function batchRequest(requests, networkId) {
    return __awaiter(this, void 0, void 0, function () {
        var res, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(getApiUrl(networkId), {
                        method: "POST",
                        body: JSON.stringify(requests.map(function (request, i) { return ({
                            id: i,
                            jsonrpc: "2.0",
                            method: request.method,
                            params: request.params,
                        }); })),
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.map(function (entry) { return entry.result; })];
            }
        });
    });
}
/**
 * Gets Ethereum balance as hex encoded string.
 * @param address Ethereum address to fetch ETH balance for
 * @param networkId Network ID
 * @returns Hex encoded ETH balance
 */
function getBalance(address, networkId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request("eth_getBalance", [address], networkId)];
        });
    });
}
/**
 * Gets ERC20 balances of tokens that provided address interacted with.
 * Response might include 0 balances.
 * @param address Ethereum address to fetch token balances for
 * @param networkId Network ID
 * @returns Token balances
 */
function getTokenBalances(address, networkId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request("alchemy_getTokenBalances", [address], networkId)];
        });
    });
}
/**
 * Gets ERC20 tokens metadata (name, symbol, decimals, logo).
 * @param addresses Array of ERC20 tokens addresses
 * @param networkId Network ID
 * @returns Array of token metadata
 */
function getTokensMetadata(addresses, networkId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, batchRequest(addresses.map(function (address) { return ({
                    method: "alchemy_getTokenMetadata",
                    params: [address],
                }); }), networkId)];
        });
    });
}
/**
 * Gets Ethereum and ERC20 balances including metadata for tokens.
 * @param address Ethereum address to fetch balances for
 * @param networkId Network ID
 * @returns Array of balances
 */
function getBalances(address, networkId, baseToken) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, ethBalance, tokenBalances, contractAddresses, metadata;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        getBalance(address, networkId),
                        getTokenBalances(address, networkId),
                    ])];
                case 1:
                    _a = _b.sent(), ethBalance = _a[0], tokenBalances = _a[1].tokenBalances;
                    contractAddresses = tokenBalances.map(function (balance) { return balance.contractAddress; });
                    return [4 /*yield*/, getTokensMetadata(contractAddresses, networkId)];
                case 2:
                    metadata = _b.sent();
                    return [2 /*return*/, __spreadArray([
                            {
                                name: baseToken.name,
                                symbol: baseToken.symbol,
                                decimals: 18,
                                logo: null,
                                contractAddress: constants_1.ETH_CONTRACT,
                                tokenBalance: ethBalance,
                                price: 0,
                                value: 0,
                                change: 0,
                            }
                        ], tokenBalances
                            .map(function (balance, i) { return (__assign(__assign(__assign({}, balance), metadata[i]), { price: 0, value: 0, change: 0 })); })
                            .filter(function (token) { return token.symbol && !token.symbol.includes("."); }), true)];
            }
        });
    });
}
