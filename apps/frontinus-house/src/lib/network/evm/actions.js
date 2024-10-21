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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActions = createActions;
var constants_1 = require("@/data/constants");
var link_1 = require("@/lib/link");
var mana_1 = require("@/lib/mana");
var constants_2 = require("@/lib/network/common/constants");
var helpers_1 = require("@/lib/network/common/helpers");
var transactions_1 = require("@/lib/transactions");
var utils_1 = require("@/lib/utils");
var contracts_1 = require("@ethersproject/contracts");
var sx_1 = require("@snapshot-labs/sx");
var CONFIGS = {
    1: sx_1.evmMainnet,
    11155111: sx_1.evmSepolia,
};
function createActions(provider, helpers, chainId) {
    var _this = this;
    var networkConfig = CONFIGS[chainId];
    var pickAuthenticatorAndStrategies = (0, helpers_1.createStrategyPicker)({
        helpers: helpers,
        managerConnectors: constants_2.EVM_CONNECTORS,
    });
    if (!networkConfig) {
        throw new Error("Network configuration is undefined");
    }
    var client = new sx_1.clients.EvmEthereumTx({ networkConfig: networkConfig });
    var ethSigClient = new sx_1.clients.EvmEthereumSig({
        networkConfig: networkConfig,
        manaUrl: mana_1.MANA_URL,
    });
    var getIsContract = function (address) { return __awaiter(_this, void 0, void 0, function () {
        var code;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, provider.getCode(address)];
                case 1:
                    code = _a.sent();
                    return [2 /*return*/, code !== "0x"];
            }
        });
    }); };
    return {
        propose: function (web3, connectorType, account, space, cid, executionStrategy, transactions) { return __awaiter(_this, void 0, void 0, function () {
            var isContract, _a, relayerType, authenticator, strategies, selectedExecutionStrategy, strategiesWithMetadata, data;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, chainId)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, getIsContract(account)];
                    case 2:
                        isContract = _b.sent();
                        _a = pickAuthenticatorAndStrategies({
                            authenticators: space.authenticators,
                            strategies: space.voting_power_validation_strategy_strategies,
                            strategiesIndicies: space.voting_power_validation_strategy_strategies.map(function (_, i) { return i; }),
                            connectorType: connectorType,
                            isContract: isContract,
                        }), relayerType = _a.relayerType, authenticator = _a.authenticator, strategies = _a.strategies;
                        if (executionStrategy) {
                            selectedExecutionStrategy = {
                                addr: executionStrategy,
                                params: (0, helpers_1.getExecutionData)(space, executionStrategy, transactions)
                                    .executionParams[0],
                            };
                        }
                        else {
                            selectedExecutionStrategy = {
                                addr: "0x0000000000000000000000000000000000000000",
                                params: "0x",
                            };
                        }
                        return [4 /*yield*/, Promise.all(strategies.map(function (strategy) { return __awaiter(_this, void 0, void 0, function () {
                                var metadata;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, helpers_1.parseStrategyMetadata)(space.voting_power_validation_strategies_parsed_metadata[strategy.index].payload)];
                                        case 1:
                                            metadata = _a.sent();
                                            return [2 /*return*/, __assign(__assign({}, strategy), { metadata: metadata })];
                                    }
                                });
                            }); }))];
                    case 3:
                        strategiesWithMetadata = _b.sent();
                        data = {
                            space: space.id,
                            authenticator: authenticator,
                            strategies: strategiesWithMetadata,
                            executionStrategy: selectedExecutionStrategy,
                            metadataUri: "ipfs://".concat(cid),
                        };
                        if (relayerType === "evm") {
                            return [2 /*return*/, ethSigClient.propose({
                                    signer: web3.getSigner(),
                                    data: data,
                                })];
                        }
                        return [2 /*return*/, client.propose({
                                signer: web3.getSigner(),
                                envelope: {
                                    data: data,
                                },
                            }, {
                                noWait: isContract,
                            })];
                }
            });
        }); },
        updateProposal: function (web3, connectorType, account, space, proposalId, cid, executionStrategy, transactions) {
            return __awaiter(this, void 0, void 0, function () {
                var isContract, _a, relayerType, authenticator, selectedExecutionStrategy, data;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, chainId)];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, getIsContract(account)];
                        case 2:
                            isContract = _b.sent();
                            _a = pickAuthenticatorAndStrategies({
                                authenticators: space.authenticators,
                                strategies: space.voting_power_validation_strategy_strategies,
                                strategiesIndicies: space.voting_power_validation_strategy_strategies.map(function (_, i) { return i; }),
                                connectorType: connectorType,
                                isContract: isContract,
                            }), relayerType = _a.relayerType, authenticator = _a.authenticator;
                            if (executionStrategy) {
                                selectedExecutionStrategy = {
                                    addr: executionStrategy,
                                    params: (0, helpers_1.getExecutionData)(space, executionStrategy, transactions)
                                        .executionParams[0],
                                };
                            }
                            else {
                                selectedExecutionStrategy = {
                                    addr: "0x0000000000000000000000000000000000000000",
                                    params: "0x",
                                };
                            }
                            data = {
                                space: space.id,
                                proposal: proposalId,
                                authenticator: authenticator,
                                executionStrategy: selectedExecutionStrategy,
                                metadataUri: "ipfs://".concat(cid),
                            };
                            if (relayerType === "evm") {
                                return [2 /*return*/, ethSigClient.updateProposal({
                                        signer: web3.getSigner(),
                                        data: data,
                                    })];
                            }
                            return [2 /*return*/, client.updateProposal({
                                    signer: web3.getSigner(),
                                    envelope: {
                                        data: data,
                                    },
                                }, { noWait: isContract })];
                    }
                });
            });
        },
        cancelProposal: function (web3, proposal) { return __awaiter(_this, void 0, void 0, function () {
            var address, isContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, chainId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, web3.getSigner().getAddress()];
                    case 2:
                        address = _a.sent();
                        return [4 /*yield*/, getIsContract(address)];
                    case 3:
                        isContract = _a.sent();
                        return [2 /*return*/, client.cancel({
                                signer: web3.getSigner(),
                                space: proposal.space.id,
                                proposal: proposal.proposal_id,
                            }, { noWait: isContract })];
                }
            });
        }); },
        vote: function (web3, connectorType, account, proposal, choice) { return __awaiter(_this, void 0, void 0, function () {
            var isContract, _a, relayerType, authenticator, strategies, strategiesWithMetadata, data;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, chainId)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, getIsContract(account)];
                    case 2:
                        isContract = _b.sent();
                        _a = pickAuthenticatorAndStrategies({
                            authenticators: proposal.space.authenticators,
                            strategies: proposal.strategies,
                            strategiesIndicies: proposal.strategies_indicies,
                            connectorType: connectorType,
                            isContract: isContract,
                        }), relayerType = _a.relayerType, authenticator = _a.authenticator, strategies = _a.strategies;
                        return [4 /*yield*/, Promise.all(strategies.map(function (strategy) { return __awaiter(_this, void 0, void 0, function () {
                                var metadataIndex, metadata;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            metadataIndex = proposal.strategies_indicies.indexOf(strategy.index);
                                            return [4 /*yield*/, (0, helpers_1.parseStrategyMetadata)(proposal.space.strategies_parsed_metadata[metadataIndex].payload)];
                                        case 1:
                                            metadata = _a.sent();
                                            return [2 /*return*/, __assign(__assign({}, strategy), { metadata: metadata })];
                                    }
                                });
                            }); }))];
                    case 3:
                        strategiesWithMetadata = _b.sent();
                        data = {
                            space: proposal.space.id,
                            authenticator: authenticator,
                            strategies: strategiesWithMetadata,
                            proposal: proposal.proposal_id,
                            choice: (0, helpers_1.getSdkChoice)(choice),
                            metadataUri: "",
                            chainId: chainId,
                        };
                        /* if (!isContract && proposal.execution_strategy_type === 'Axiom') {
                          return highlightVote({ signer: web3.getSigner(), data });
                        }*/
                        if (relayerType === "evm") {
                            return [2 /*return*/, ethSigClient.vote({
                                    signer: web3.getSigner(),
                                    data: data,
                                })];
                        }
                        return [2 /*return*/, client.vote({
                                signer: web3.getSigner(),
                                envelope: {
                                    data: data,
                                },
                            }, { noWait: isContract })];
                }
            });
        }); },
        finalizeProposal: function (web3, proposal) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mana_1.executionCall)(chainId, "finalizeProposal", {
                            space: proposal.space.id,
                            proposalId: proposal.proposal_id,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        }); },
        executeTransactions: function (web3, proposal) { return __awaiter(_this, void 0, void 0, function () {
            var executionData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, chainId)];
                    case 1:
                        _a.sent();
                        executionData = (0, helpers_1.getExecutionData)(proposal.space, proposal.execution_strategy, (0, transactions_1.convertToMetaTransactions)(proposal.execution));
                        return [2 /*return*/, (0, mana_1.executionCall)(chainId, "execute", {
                                space: proposal.space.id,
                                proposalId: proposal.proposal_id,
                                executionParams: executionData.executionParams[0],
                            })];
                }
            });
        }); },
        executeQueuedProposal: function (web3, proposal) { return __awaiter(_this, void 0, void 0, function () {
            var executionData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, chainId)];
                    case 1:
                        _a.sent();
                        executionData = (0, helpers_1.getExecutionData)(proposal.space, proposal.execution_strategy, (0, transactions_1.convertToMetaTransactions)(proposal.execution));
                        return [2 /*return*/, (0, mana_1.executionCall)(chainId, "executeQueuedProposal", {
                                space: proposal.space.id,
                                executionStrategy: proposal.execution_strategy,
                                executionParams: executionData.executionParams[0],
                            })];
                }
            });
        }); },
        vetoProposal: function (web3, proposal) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, chainId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, client.vetoExecution({
                                signer: web3.getSigner(),
                                executionStrategy: proposal.execution_strategy,
                                executionHash: proposal.execution_hash,
                            })];
                }
            });
        }); },
        setVotingDelay: function (web3, space, votingDelay) { return __awaiter(_this, void 0, void 0, function () {
            var address, isContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, chainId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, web3.getSigner().getAddress()];
                    case 2:
                        address = _a.sent();
                        return [4 /*yield*/, getIsContract(address)];
                    case 3:
                        isContract = _a.sent();
                        return [2 /*return*/, client.setVotingDelay({
                                signer: web3.getSigner(),
                                space: space.id,
                                votingDelay: votingDelay,
                            }, { noWait: isContract })];
                }
            });
        }); },
        setMinVotingDuration: function (web3, space, minVotingDuration) { return __awaiter(_this, void 0, void 0, function () {
            var address, isContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, chainId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, web3.getSigner().getAddress()];
                    case 2:
                        address = _a.sent();
                        return [4 /*yield*/, getIsContract(address)];
                    case 3:
                        isContract = _a.sent();
                        return [2 /*return*/, client.setMinVotingDuration({
                                signer: web3.getSigner(),
                                space: space.id,
                                minVotingDuration: minVotingDuration,
                            }, { noWait: isContract })];
                }
            });
        }); },
        setMaxVotingDuration: function (web3, space, maxVotingDuration) { return __awaiter(_this, void 0, void 0, function () {
            var address, isContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, chainId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, web3.getSigner().getAddress()];
                    case 2:
                        address = _a.sent();
                        return [4 /*yield*/, getIsContract(address)];
                    case 3:
                        isContract = _a.sent();
                        return [2 /*return*/, client.setMaxVotingDuration({
                                signer: web3.getSigner(),
                                space: space.id,
                                maxVotingDuration: maxVotingDuration,
                            }, { noWait: isContract })];
                }
            });
        }); },
        delegate: function (web3, space, networkId, delegatee, delegationContract) { return __awaiter(_this, void 0, void 0, function () {
            var _a, contractAddress, votesContract;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, constants_1.CHAIN_IDS[networkId])];
                    case 1:
                        _b.sent();
                        _a = delegationContract.split(":"), contractAddress = _a[1];
                        votesContract = new contracts_1.Contract(contractAddress, ["function delegate(address delegatee)"], web3.getSigner());
                        return [2 /*return*/, votesContract.delegate(delegatee)];
                }
            });
        }); },
        send: function (envelope) { return ethSigClient.send(envelope); },
        getVotingPower: function (spaceId, strategiesAddresses, strategiesParams, strategiesMetadata, voterAddress, snapshotInfo) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (snapshotInfo.at === null)
                    throw new Error("EVM requires block number to be defined");
                return [2 /*return*/, Promise.all(strategiesAddresses.map(function (address, i) { return __awaiter(_this, void 0, void 0, function () {
                        var strategy, strategyMetadata, value, token;
                        var _a, _b, _c, _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    strategy = (0, sx_1.getEvmStrategy)(address, networkConfig);
                                    if (!strategy)
                                        return [2 /*return*/, { address: address, value: 0n, decimals: 0, token: null, symbol: "" }];
                                    return [4 /*yield*/, (0, helpers_1.parseStrategyMetadata)(strategiesMetadata[i].payload)];
                                case 1:
                                    strategyMetadata = _e.sent();
                                    return [4 /*yield*/, strategy.getVotingPower(address, voterAddress, strategyMetadata, snapshotInfo.at, strategiesParams[i], provider)];
                                case 2:
                                    value = _e.sent();
                                    token = ["comp", "ozVotes"].includes(strategy.type)
                                        ? strategiesParams[i]
                                        : undefined;
                                    return [2 /*return*/, {
                                            address: address,
                                            value: value,
                                            decimals: (_b = (_a = strategiesMetadata[i]) === null || _a === void 0 ? void 0 : _a.decimals) !== null && _b !== void 0 ? _b : 0,
                                            symbol: (_d = (_c = strategiesMetadata[i]) === null || _c === void 0 ? void 0 : _c.symbol) !== null && _d !== void 0 ? _d : "",
                                            token: token,
                                            swapLink: (0, link_1.getSwapLink)(strategy.type, address, chainId),
                                        }];
                            }
                        });
                    }); }))];
            });
        }); },
    };
}
