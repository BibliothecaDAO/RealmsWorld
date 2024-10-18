"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.useDelegates = useDelegates;
var react_1 = require("react");
var stamp_1 = require("@/lib/stamp");
var core_1 = require("@apollo/client/core");
var graphql_tag_1 = require("graphql-tag");
var DELEGATES_LIMIT = 40;
var DELEGATES_QUERY = (0, graphql_tag_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query (\n    $first: Int!\n    $skip: Int!\n    $orderBy: Delegate_orderBy!\n    $orderDirection: OrderDirection!\n  ) {\n    delegates(\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: { tokenHoldersRepresentedAmount_gte: 0 }\n    ) {\n      id\n      delegatedVotes\n      delegatedVotesRaw\n      tokenHoldersRepresentedAmount\n    }\n    governance(id: \"GOVERNANCE\") {\n      delegatedVotes\n      totalTokenHolders\n      totalDelegates\n    }\n  }\n"], ["\n  query (\n    $first: Int!\n    $skip: Int!\n    $orderBy: Delegate_orderBy!\n    $orderDirection: OrderDirection!\n  ) {\n    delegates(\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: { tokenHoldersRepresentedAmount_gte: 0 }\n    ) {\n      id\n      delegatedVotes\n      delegatedVotesRaw\n      tokenHoldersRepresentedAmount\n    }\n    governance(id: \"GOVERNANCE\") {\n      delegatedVotes\n      totalTokenHolders\n      totalDelegates\n    }\n  }\n"])));
function convertUrl(apiUrl) {
    var hostedPattern = /https:\/\/thegraph\.com\/hosted-service\/subgraph\/([\w-]+)\/([\w-]+)/;
    var hostedMatch = apiUrl.match(hostedPattern);
    if (hostedMatch) {
        return "https://api.thegraph.com/subgraphs/name/".concat(hostedMatch[1], "/").concat(hostedMatch[2]);
    }
    return apiUrl;
}
function useDelegates(delegationApiUrl) {
    var _a = (0, react_1.useState)([]), delegates = _a[0], setDelegates = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(false), loadingMore = _c[0], setLoadingMore = _c[1];
    var _d = (0, react_1.useState)(false), loaded = _d[0], setLoaded = _d[1];
    var _e = (0, react_1.useState)(false), failed = _e[0], setFailed = _e[1];
    var _f = (0, react_1.useState)(false), hasMore = _f[0], setHasMore = _f[1];
    var httpLink = (0, core_1.createHttpLink)({
        uri: convertUrl(delegationApiUrl),
    });
    var apollo = new core_1.ApolloClient({
        link: httpLink,
        cache: new core_1.InMemoryCache({
            addTypename: false,
        }),
        defaultOptions: {
            query: {
                fetchPolicy: "no-cache",
            },
        },
    });
    function _fetch(overwrite, sortBy) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, orderBy, orderDirection, data, governanceData, delegatesData, addresses, names, newDelegates;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = sortBy.split("-"), orderBy = _a[0], orderDirection = _a[1];
                        return [4 /*yield*/, apollo.query({
                                query: DELEGATES_QUERY,
                                variables: {
                                    orderBy: orderBy,
                                    orderDirection: orderDirection,
                                    first: DELEGATES_LIMIT,
                                    skip: overwrite ? 0 : delegates.length,
                                },
                            })];
                    case 1:
                        data = (_b.sent()).data;
                        console.log(data);
                        governanceData = data.governance;
                        delegatesData = data.delegates;
                        addresses = delegatesData.map(function (delegate) { return delegate.id; });
                        return [4 /*yield*/, (0, stamp_1.getNames)(addresses)];
                    case 2:
                        names = _b.sent();
                        newDelegates = delegatesData.map(function (delegate) {
                            var delegatorsPercentage = (Number(delegate.tokenHoldersRepresentedAmount) /
                                Number(governanceData.totalTokenHolders)) *
                                100;
                            var votesPercentage = (Number(delegate.delegatedVotes) /
                                Number(governanceData.delegatedVotes)) *
                                100 || 0;
                            return __assign(__assign({ name: names[delegate.id] || null }, delegate), { delegatorsPercentage: delegatorsPercentage, votesPercentage: votesPercentage });
                        });
                        setDelegates(overwrite ? newDelegates : __spreadArray(__spreadArray([], delegates, true), newDelegates, true));
                        setHasMore(delegatesData.length === DELEGATES_LIMIT);
                        return [2 /*return*/];
                }
            });
        });
    }
    function fetch() {
        return __awaiter(this, arguments, void 0, function (sortBy) {
            var e_1;
            if (sortBy === void 0) { sortBy = "delegatedVotes-desc"; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (loading || loaded)
                            return [2 /*return*/];
                        setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, _fetch(true, sortBy)];
                    case 2:
                        _a.sent();
                        setLoaded(true);
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        setFailed(true);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function fetchMore() {
        return __awaiter(this, arguments, void 0, function (sortBy) {
            if (sortBy === void 0) { sortBy = "delegatedVotes-desc"; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (loading || !loaded)
                            return [2 /*return*/];
                        setLoadingMore(true);
                        return [4 /*yield*/, _fetch(false, sortBy)];
                    case 1:
                        _a.sent();
                        setLoadingMore(false);
                        return [2 /*return*/];
                }
            });
        });
    }
    function reset() {
        setDelegates([]);
        setLoading(false);
        setLoadingMore(false);
        setLoaded(false);
        setFailed(false);
        setHasMore(false);
    }
    return {
        loading: loading,
        loadingMore: loadingMore,
        loaded: loaded,
        failed: failed,
        hasMore: hasMore,
        delegates: delegates,
        fetch: fetch,
        fetchMore: fetchMore,
        reset: reset,
    };
}
var templateObject_1;
