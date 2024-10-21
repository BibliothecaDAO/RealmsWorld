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
exports.shorten = shorten;
exports.shortenAddress = shortenAddress;
exports.formatAddress = formatAddress;
exports.getUrl = getUrl;
exports.getProposalId = getProposalId;
exports.verifyNetwork = verifyNetwork;
exports._rt = _rt;
var constants_1 = require("@/data/constants");
var address_1 = require("@ethersproject/address");
var starknet_1 = require("starknet");
var IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY || "https://cloudflare-ipfs.com";
function shorten(str, key) {
    if (!str)
        return str;
    var limit;
    if (typeof key === "number")
        limit = key;
    if (key === "symbol")
        limit = constants_1.MAX_SYMBOL_LENGTH;
    if (key === "name")
        limit = 64;
    if (key === "choice")
        limit = 12;
    if (limit)
        return str.length > limit ? "".concat(str.slice(0, limit).trim(), "...") : str;
    return shortenAddress(str);
}
function shortenAddress(str) {
    if (str === void 0) { str = ""; }
    var formatted = formatAddress(str);
    return "".concat(formatted.slice(0, 6), "...").concat(formatted.slice(formatted.length - 4));
}
function formatAddress(address) {
    if (address.length === 42)
        return (0, address_1.getAddress)(address);
    try {
        return (0, starknet_1.validateAndParseAddress)(address);
    }
    catch (_a) {
        return address;
    }
}
function getUrl(uri) {
    var ipfsGateway = "https://".concat(IPFS_GATEWAY);
    if (!uri)
        return null;
    if (!uri.startsWith("ipfs://") &&
        !uri.startsWith("ipns://") &&
        !uri.startsWith("https://") &&
        !uri.startsWith("http://")) {
        return "".concat(ipfsGateway, "/ipfs/").concat(uri);
    }
    var uriScheme = uri.split("://")[0];
    if (uriScheme === "ipfs")
        return uri.replace("ipfs://", "".concat(ipfsGateway, "/ipfs/"));
    if (uriScheme === "ipns")
        return uri.replace("ipns://", "".concat(ipfsGateway, "/ipns/"));
    return uri;
}
function getProposalId(proposal) {
    var proposalId = proposal.proposal_id.toString();
    if (proposalId.startsWith("0x")) {
        return "#".concat(proposalId.slice(2, 7));
    }
    if ([46, 59].includes(proposalId.length)) {
        return "#".concat(proposalId.slice(-5));
    }
    return "#".concat(proposalId);
}
function verifyNetwork(web3Provider, chainId) {
    return __awaiter(this, void 0, void 0, function () {
        var network, encodedChainId, err_1, network_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!web3Provider.provider.request)
                        return [2 /*return*/];
                    return [4 /*yield*/, web3Provider.getNetwork()];
                case 1:
                    network = _a.sent();
                    if (network.chainId === chainId)
                        return [2 /*return*/];
                    encodedChainId = "0x".concat(chainId.toString(16));
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 6]);
                    return [4 /*yield*/, web3Provider.provider.request({
                            method: "wallet_switchEthereumChain",
                            params: [{ chainId: encodedChainId }],
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    //@ts-expect-error
                    if (err_1.code !== 4902)
                        throw new Error(err_1.message);
                    return [4 /*yield*/, web3Provider.getNetwork()];
                case 5:
                    network_1 = _a.sent();
                    if (network_1.chainId !== chainId) {
                        error = new Error("User rejected network change after it being added");
                        error.code = 4001;
                        throw error;
                    }
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function _rt(date) {
    var seconds = Math.floor(new Date().getTime() / 1000 - date);
    var years = Math.floor(seconds / 31536000);
    var months = Math.floor(seconds / 2592000);
    var days = Math.floor(seconds / 86400);
    if (days > 548) {
        return years + " years ago";
    }
    if (days >= 320 && days <= 547) {
        return "a year ago";
    }
    if (days >= 45 && days <= 319) {
        return months + " months ago";
    }
    if (days >= 26 && days <= 45) {
        return "a month ago";
    }
    var hours = Math.floor(seconds / 3600);
    if (hours >= 36 && days <= 25) {
        return days + " days ago";
    }
    if (hours >= 22 && hours <= 35) {
        return "a day ago";
    }
    var minutes = Math.floor(seconds / 60);
    if (minutes >= 90 && hours <= 21) {
        return hours + " hours ago";
    }
    if (minutes >= 45 && minutes <= 89) {
        return "an hour ago";
    }
    if (seconds >= 90 && minutes <= 44) {
        return minutes + " minutes ago";
    }
    if (seconds >= 45 && seconds <= 89) {
        return "a minute ago";
    }
    if (seconds >= 0 && seconds <= 45) {
        return "a few seconds ago";
    }
}
