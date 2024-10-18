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
exports.createApi = createApi;
var constants_1 = require("@/data/constants");
var stamp_1 = require("@/lib/stamp");
var core_1 = require("@apollo/client/core");
var highlight_1 = require("./highlight");
var queries_1 = require("./queries");
function getProposalState(proposal, current) {
    if (proposal.executed)
        return "executed";
    if (proposal.max_end <= current) {
        if (proposal.scores_total < proposal.quorum)
            return "rejected";
        return proposal.scores_1 > proposal.scores_2 ? "passed" : "rejected";
    }
    if (proposal.start > current)
        return "pending";
    return "active";
}
function formatExecution(execution) {
    if (execution === "")
        return [];
    try {
        var result = JSON.parse(execution);
        return Array.isArray(result) ? result : [];
    }
    catch (e) {
        console.log("Failed to parse execution");
        return [];
    }
}
function processStrategiesMetadata(parsedMetadata, strategiesIndicies) {
    if (parsedMetadata.length === 0)
        return [];
    var maxIndex = Math.max.apply(Math, parsedMetadata.map(function (metadata) { return metadata.index; }));
    var metadataMap = Object.fromEntries(parsedMetadata.map(function (metadata) { return [
        metadata.index,
        {
            name: metadata.data.name,
            description: metadata.data.description,
            decimals: metadata.data.decimals,
            symbol: metadata.data.symbol,
            token: metadata.data.token,
            payload: metadata.data.payload,
        },
    ]; }));
    strategiesIndicies =
        strategiesIndicies || Array.from(Array(maxIndex + 1).keys());
    return strategiesIndicies.map(function (index) { return metadataMap[index]; }) || [];
}
function formatSpace(space, networkId) {
    return __assign(__assign({}, space), { network: networkId, verified: false, turbo: false, name: space.metadata.name, avatar: space.metadata.avatar, cover: space.metadata.cover, about: space.metadata.about, external_url: space.metadata.external_url, github: space.metadata.github, twitter: space.metadata.twitter, discord: space.metadata.discord, voting_power_symbol: space.metadata.voting_power_symbol, treasuries: space.metadata.treasuries.map(function (treasury) {
            var _a = JSON.parse(treasury), name = _a.name, network = _a.network, address = _a.address;
            return {
                name: name,
                network: network,
                address: address,
            };
        }), delegations: space.metadata.delegations.map(function (delegation) {
            var _a = JSON.parse(delegation), name = _a.name, api_type = _a.api_type, api_url = _a.api_url, contract = _a.contract;
            var _b = contract.split(":"), network = _b[0], address = _b[1];
            return {
                name: name,
                apiType: api_type,
                apiUrl: api_url,
                contractNetwork: network === "null" ? null : network,
                contractAddress: address === "null" ? null : address,
            };
        }), executors: space.metadata.executors, executors_types: space.metadata.executors_types, executors_destinations: space.metadata.executors_destinations, executors_strategies: space.metadata.executors_strategies, 
        //@ts-expect-error undefined
        voting_power_validation_strategies_parsed_metadata: processStrategiesMetadata(space.voting_power_validation_strategies_parsed_metadata), 
        //@ts-expect-error undefined
        strategies_parsed_metadata: processStrategiesMetadata(space.strategies_parsed_metadata, space.strategies_indicies) });
}
function formatProposal(proposal, networkId, current) {
    return __assign(__assign({}, proposal), { space: {
            id: proposal.space.id,
            name: proposal.space.metadata.name,
            avatar: proposal.space.metadata.avatar,
            controller: proposal.space.controller,
            authenticators: proposal.space.authenticators,
            voting_power_symbol: proposal.space.metadata.voting_power_symbol,
            executors: proposal.space.metadata.executors,
            executors_types: proposal.space.metadata.executors_types,
            //@ts-expect-error undefined
            strategies_parsed_metadata: processStrategiesMetadata(proposal.space.strategies_parsed_metadata, proposal.strategies_indicies),
        }, metadata_uri: proposal.metadata.id, type: "basic", choices: constants_1.BASIC_CHOICES, scores: [proposal.scores_1, proposal.scores_2, proposal.scores_3], title: proposal.metadata.title, body: proposal.metadata.body, discussion: proposal.metadata.discussion, execution: formatExecution(proposal.metadata.execution), has_execution_window_opened: proposal.execution_strategy_type === "Axiom"
            ? proposal.max_end <= current
            : proposal.min_end <= current, state: getProposalState(proposal, current), network: networkId, privacy: null, quorum: +proposal.quorum });
}
function createApi(uri, networkId, opts) {
    var _this = this;
    if (opts === void 0) { opts = {}; }
    var httpLink = (0, core_1.createHttpLink)({ uri: uri });
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
    var highlightApolloClient = opts.highlightApiUrl
        ? new core_1.ApolloClient({
            link: (0, core_1.createHttpLink)({ uri: opts.highlightApiUrl }),
            cache: new core_1.InMemoryCache({
                addTypename: false,
            }),
            defaultOptions: {
                query: {
                    fetchPolicy: "no-cache",
                },
            },
        })
        : null;
    var highlightVotesCache = {
        key: null,
        data: [],
        remaining: [],
    };
    return {
        loadProposalVotes: function (proposal_1, _a) {
            var args_1 = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args_1[_i - 2] = arguments[_i];
            }
            return __awaiter(_this, __spreadArray([proposal_1, _a], args_1, true), void 0, function (proposal, _b, filter, sortBy) {
                var filters, _c, orderBy, orderDirection, data, cacheKey, cacheValid, highlightData, _d, result, remaining, addresses, names;
                var limit = _b.limit, _e = _b.skip, skip = _e === void 0 ? 0 : _e;
                if (filter === void 0) { filter = "any"; }
                if (sortBy === void 0) { sortBy = "vp-desc"; }
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            filters = {};
                            if (filter === "for") {
                                filters.choice = 1;
                            }
                            else if (filter === "against") {
                                filters.choice = 2;
                            }
                            else if (filter === "abstain") {
                                filters.choice = 3;
                            }
                            _c = sortBy.split("-"), orderBy = _c[0], orderDirection = _c[1];
                            return [4 /*yield*/, apollo.query({
                                    query: queries_1.VOTES_QUERY,
                                    variables: {
                                        first: limit,
                                        skip: skip,
                                        orderBy: orderBy,
                                        orderDirection: orderDirection,
                                        where: __assign({ space: proposal.space.id, proposal: proposal.proposal_id }, filters),
                                    },
                                })];
                        case 1:
                            data = (_f.sent()).data;
                            if (!highlightApolloClient) return [3 /*break*/, 5];
                            cacheKey = "".concat(proposal.space.id, "/").concat(proposal.proposal_id);
                            cacheValid = highlightVotesCache.key === cacheKey;
                            if (!!cacheValid) return [3 /*break*/, 3];
                            return [4 /*yield*/, highlightApolloClient.query({
                                    query: highlight_1.VOTES_QUERY,
                                    variables: {
                                        space: proposal.space.id,
                                        proposal: proposal.proposal_id,
                                    },
                                })];
                        case 2:
                            highlightData = (_f.sent()).data;
                            highlightVotesCache.key = cacheKey;
                            highlightVotesCache.data = highlightData.votes;
                            highlightVotesCache.remaining = highlightData.votes;
                            return [3 /*break*/, 4];
                        case 3:
                            if (skip === 0) {
                                highlightVotesCache.remaining = highlightVotesCache.data;
                            }
                            _f.label = 4;
                        case 4:
                            _d = (0, highlight_1.mixinHighlightVotes)(data.votes, highlightVotesCache.remaining, filter, orderBy, orderDirection, limit), result = _d.result, remaining = _d.remaining;
                            highlightVotesCache.remaining = remaining;
                            data.votes = result;
                            _f.label = 5;
                        case 5:
                            addresses = data.votes.map(function (vote) { return vote.voter.id; });
                            return [4 /*yield*/, (0, stamp_1.getNames)(addresses)];
                        case 6:
                            names = _f.sent();
                            return [2 /*return*/, data.votes.map(function (vote) {
                                    vote.voter.name = names[vote.voter.id] || null;
                                    return vote;
                                })];
                    }
                });
            });
        },
        loadUserVotes: function (spaceIds, voter) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apollo.query({
                            query: queries_1.USER_VOTES_QUERY,
                            variables: {
                                spaceIds: spaceIds,
                                voter: voter,
                            },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, Object.fromEntries(data.votes.map(function (vote) { return [
                                "".concat(networkId, ":").concat(vote.space.id, "/").concat(vote.proposal),
                                vote,
                            ]; }))];
                }
            });
        }); },
        loadProposals: function (spaceIds_1, _a, current_1) {
            var args_1 = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args_1[_i - 3] = arguments[_i];
            }
            return __awaiter(_this, __spreadArray([spaceIds_1, _a, current_1], args_1, true), void 0, function (spaceIds, _b, current, filter, searchQuery) {
                var filters, data, highlightData_1;
                var limit = _b.limit, _c = _b.skip, skip = _c === void 0 ? 0 : _c;
                if (filter === void 0) { filter = "any"; }
                if (searchQuery === void 0) { searchQuery = ""; }
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            filters = {};
                            if (filter === "active") {
                                filters.start_lte = current;
                                filters.max_end_gte = current;
                            }
                            else if (filter === "pending") {
                                filters.start_gt = current;
                            }
                            else if (filter === "closed") {
                                filters.max_end_lt = current;
                            }
                            return [4 /*yield*/, apollo.query({
                                    query: queries_1.PROPOSALS_QUERY,
                                    variables: {
                                        first: limit,
                                        skip: skip,
                                        where: __assign({ space_in: spaceIds, cancelled: false, metadata_: { title_contains_nocase: searchQuery } }, filters),
                                    },
                                })];
                        case 1:
                            data = (_d.sent()).data;
                            console.log(data);
                            if (!highlightApolloClient) return [3 /*break*/, 3];
                            return [4 /*yield*/, highlightApolloClient.query({
                                    query: highlight_1.PROPOSALS_QUERY,
                                    variables: {
                                        ids: data.proposals.map(function (proposal) { return proposal.id; }),
                                    },
                                })];
                        case 2:
                            highlightData_1 = (_d.sent()).data;
                            data.proposals = data.proposals.map(function (proposal) {
                                var highlightProposal = highlightData_1.sxproposals.find(function (highlightProposal) { return highlightProposal.id === proposal.id; });
                                return (0, highlight_1.joinHighlightProposal)(proposal, highlightProposal);
                            });
                            _d.label = 3;
                        case 3: return [2 /*return*/, data.proposals.map(function (proposal) {
                                return formatProposal(proposal, networkId, current);
                            })];
                    }
                });
            });
        },
        loadProposal: function (spaceId, proposalId, current) { return __awaiter(_this, void 0, void 0, function () {
            var _a, data, highlightResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            apollo.query({
                                query: queries_1.PROPOSAL_QUERY,
                                variables: { id: "".concat(spaceId, "/").concat(proposalId) },
                            }),
                            highlightApolloClient === null || highlightApolloClient === void 0 ? void 0 : highlightApolloClient.query({
                                query: highlight_1.PROPOSAL_QUERY,
                                variables: { id: "".concat(spaceId, "/").concat(proposalId) },
                            }).catch(function () { return null; }),
                        ])];
                    case 1:
                        _a = _b.sent(), data = _a[0].data, highlightResult = _a[1];
                        if (data.proposal.metadata === null)
                            return [2 /*return*/, null];
                        data.proposal = (0, highlight_1.joinHighlightProposal)(data.proposal, highlightResult === null || highlightResult === void 0 ? void 0 : highlightResult.data.sxproposal);
                        return [2 /*return*/, formatProposal(data.proposal, networkId, current)];
                }
            });
        }); },
        loadSpaces: function (_a, filter_1) { return __awaiter(_this, [_a, filter_1], void 0, function (_b, filter) {
            var data, highlightData_2;
            var limit = _b.limit, _c = _b.skip, skip = _c === void 0 ? 0 : _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, apollo.query({
                            query: queries_1.SPACES_QUERY,
                            variables: {
                                first: limit,
                                skip: skip,
                                where: __assign(__assign({}, filter), { metadata_: {} }),
                            },
                        })];
                    case 1:
                        data = (_d.sent()).data;
                        if (!highlightApolloClient) return [3 /*break*/, 3];
                        return [4 /*yield*/, highlightApolloClient.query({
                                query: highlight_1.SPACES_QUERY,
                                variables: { ids: data.spaces.map(function (space) { return space.id; }) },
                            })];
                    case 2:
                        highlightData_2 = (_d.sent()).data;
                        data.spaces = data.spaces.map(function (space) {
                            var highlightSpace = highlightData_2.sxspaces.find(function (highlightSpace) { return highlightSpace.id === space.id; });
                            return (0, highlight_1.joinHighlightSpace)(space, highlightSpace);
                        });
                        _d.label = 3;
                    case 3: return [2 /*return*/, data.spaces.map(function (space) { return formatSpace(space, networkId); })];
                }
            });
        }); },
        loadSpace: function (id) { return __awaiter(_this, void 0, void 0, function () {
            var _a, data, highlightResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            apollo.query({
                                query: queries_1.SPACE_QUERY,
                                variables: { id: id },
                            }),
                            highlightApolloClient === null || highlightApolloClient === void 0 ? void 0 : highlightApolloClient.query({
                                query: highlight_1.SPACE_QUERY,
                                variables: { id: id },
                            }).catch(function () { return null; }),
                        ])];
                    case 1:
                        _a = _b.sent(), data = _a[0].data, highlightResult = _a[1];
                        data.space = (0, highlight_1.joinHighlightSpace)(data.space, highlightResult === null || highlightResult === void 0 ? void 0 : highlightResult.data.sxspace);
                        return [2 /*return*/, formatSpace(data.space, networkId)];
                }
            });
        }); },
        loadUser: function (id) { return __awaiter(_this, void 0, void 0, function () {
            var _a, data, highlightResult;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            apollo.query({
                                query: queries_1.USER_QUERY,
                                variables: { id: id },
                            }),
                            highlightApolloClient === null || highlightApolloClient === void 0 ? void 0 : highlightApolloClient.query({
                                query: highlight_1.USER_QUERY,
                                variables: { id: id },
                            }).catch(function () { return null; }),
                        ])];
                    case 1:
                        _a = _e.sent(), data = _a[0].data, highlightResult = _a[1];
                        return [2 /*return*/, (0, highlight_1.joinHighlightUser)((_b = data.user) !== null && _b !== void 0 ? _b : null, (_d = (_c = highlightResult === null || highlightResult === void 0 ? void 0 : highlightResult.data) === null || _c === void 0 ? void 0 : _c.sxuser) !== null && _d !== void 0 ? _d : null)];
                }
            });
        }); },
        loadLeaderboard: function (spaceId, _a, sortBy) {
            var limit = _a.limit, _b = _a.skip, skip = _b === void 0 ? 0 : _b;
            if (sortBy === void 0) { sortBy = "vote_count-desc"; }
            var _c = sortBy.split("-"), orderBy = _c[0], orderDirection = _c[1];
            return apollo
                .query({
                query: queries_1.LEADERBOARD_QUERY,
                variables: {
                    first: limit,
                    skip: skip,
                    orderBy: orderBy,
                    orderDirection: orderDirection,
                    where: {
                        space: spaceId,
                    },
                },
            })
                .then(function (_a) {
                var data = _a.data;
                return data.leaderboards.map(function (leaderboard) { return ({
                    id: leaderboard.user.id,
                    created: leaderboard.user.created,
                    vote_count: leaderboard.vote_count,
                    proposal_count: leaderboard.proposal_count,
                }); });
            });
        },
        loadFollows: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        }); },
    };
}
