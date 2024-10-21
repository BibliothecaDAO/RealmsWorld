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
var mana_1 = require("@/lib/mana");
var constants_1 = require("@/lib/network/common/constants");
var helpers_1 = require("@/lib/network/common/helpers");
var provider_1 = require("@/lib/provider");
var transactions_1 = require("@/lib/transactions");
var utils_1 = require("@/lib/utils");
var sx_1 = require("@snapshot-labs/sx");
var starknet_1 = require("starknet");
var CONFIGS = {
    sn: sx_1.starknetMainnet,
    "sn-sep": sx_1.starknetSepolia,
};
function createActions(networkId, starkProvider, helpers, _a) {
    var _this = this;
    var chainId = _a.chainId, l1ChainId = _a.l1ChainId, ethUrl = _a.ethUrl;
    var networkConfig = CONFIGS[networkId];
    if (!networkConfig)
        throw new Error("Unsupported network ".concat(networkId));
    var l1Provider = (0, provider_1.getProvider)(l1ChainId);
    var clientConfig = {
        starkProvider: starkProvider,
        manaUrl: mana_1.MANA_URL,
        ethUrl: ethUrl,
        networkConfig: networkConfig,
    };
    var pickAuthenticatorAndStrategies = (0, helpers_1.createStrategyPicker)({
        helpers: helpers,
        managerConnectors: constants_1.STARKNET_CONNECTORS,
        lowPriorityAuthenticators: ["evm-tx"],
    });
    var getIsContract = function (connectorType, address) { return __awaiter(_this, void 0, void 0, function () {
        var code;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!constants_1.EVM_CONNECTORS.includes(connectorType))
                        return [2 /*return*/, false];
                    return [4 /*yield*/, l1Provider.getCode(address)];
                case 1:
                    code = _a.sent();
                    return [2 /*return*/, code !== "0x"];
            }
        });
    }); };
    var client = new sx_1.clients.StarknetTx(clientConfig);
    var starkSigClient = new sx_1.clients.StarknetSig(clientConfig);
    var ethSigClient = new sx_1.clients.EthereumSig(clientConfig);
    var ethTxClient = new sx_1.clients.EthereumTx(clientConfig);
    var l1ExecutorClient = new sx_1.clients.L1Executor();
    return {
        predictSpaceAddress: function (web3_1, _a) {
            return __awaiter(this, arguments, void 0, function (web3, _b) {
                var salt = _b.salt;
                return __generator(this, function (_c) {
                    return [2 /*return*/, client.predictSpaceAddress({
                            account: web3.provider.account,
                            saltNonce: salt,
                        })];
                });
            });
        },
        deployDependency: function (web3, params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!params.strategy.deploy) {
                        throw new Error("This strategy is not deployable");
                    }
                    return [2 /*return*/, params.strategy.deploy(client, web3, params.controller, params.spaceAddress, params.strategy.params)];
                });
            });
        },
        propose: function (web3, connectorType, account, space, cid, executionStrategy, executionDestinationAddress, transactions) { return __awaiter(_this, void 0, void 0, function () {
            var isContract, _a, relayerType, authenticator, strategies, selectedExecutionStrategy, strategiesWithMetadata, data;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getIsContract(connectorType, account)];
                    case 1:
                        isContract = _b.sent();
                        _a = pickAuthenticatorAndStrategies({
                            authenticators: space.authenticators,
                            strategies: space.voting_power_validation_strategy_strategies,
                            strategiesIndicies: space.voting_power_validation_strategy_strategies.map(function (_, i) { return i; }),
                            connectorType: connectorType,
                            isContract: isContract,
                        }), relayerType = _a.relayerType, authenticator = _a.authenticator, strategies = _a.strategies;
                        if (!(relayerType && ["evm", "evm-tx"].includes(relayerType))) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, l1ChainId)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        if (executionStrategy) {
                            selectedExecutionStrategy = {
                                addr: executionStrategy,
                                params: (0, helpers_1.getExecutionData)(space, executionStrategy, executionDestinationAddress, transactions).executionParams,
                            };
                        }
                        else {
                            selectedExecutionStrategy = {
                                addr: "0x0000000000000000000000000000000000000000",
                                params: [],
                            };
                        }
                        return [4 /*yield*/, Promise.all(strategies.map(function (strategy) { return __awaiter(_this, void 0, void 0, function () {
                                var metadata;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, helpers_1.parseStrategyMetadata)(space.voting_power_validation_strategies_parsed_metadata[
                                            //@ts-expect-error index can be undefined?
                                            strategy.index].payload)];
                                        case 1:
                                            metadata = _a.sent();
                                            return [2 /*return*/, __assign(__assign({}, strategy), { metadata: metadata })];
                                    }
                                });
                            }); }))];
                    case 4:
                        strategiesWithMetadata = _b.sent();
                        data = {
                            space: space.id,
                            authenticator: authenticator,
                            strategies: strategiesWithMetadata,
                            executionStrategy: selectedExecutionStrategy,
                            metadataUri: "ipfs://".concat(cid),
                        };
                        if (relayerType === "starknet") {
                            return [2 /*return*/, starkSigClient.propose({
                                    signer: web3.provider.account,
                                    //@ts-expect-error index can be undefined?
                                    data: data,
                                })];
                        }
                        else if (relayerType === "evm") {
                            return [2 /*return*/, ethSigClient.propose({
                                    signer: web3.getSigner(),
                                    //@ts-expect-error index can be undefined?
                                    data: data,
                                })];
                        }
                        else if (relayerType === "evm-tx") {
                            //@ts-expect-error index can be undefined?
                            return [2 /*return*/, ethTxClient.initializePropose(web3.getSigner(), data, {
                                    noWait: isContract,
                                })];
                        }
                        return [2 /*return*/, client.propose(web3.provider.account, {
                                //@ts-expect-error index can be undefined?
                                data: data,
                            })];
                }
            });
        }); },
        updateProposal: function (web3, connectorType, account, space, proposalId, cid, executionStrategy, executionDestinationAddress, transactions) {
            return __awaiter(this, void 0, void 0, function () {
                var isContract, _a, relayerType, authenticator, selectedExecutionStrategy, data;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, getIsContract(connectorType, account)];
                        case 1:
                            isContract = _b.sent();
                            _a = pickAuthenticatorAndStrategies({
                                authenticators: space.authenticators,
                                strategies: space.voting_power_validation_strategy_strategies,
                                strategiesIndicies: space.voting_power_validation_strategy_strategies.map(function (_, i) { return i; }),
                                connectorType: connectorType,
                                isContract: isContract,
                            }), relayerType = _a.relayerType, authenticator = _a.authenticator;
                            if (!(relayerType && ["evm", "evm-tx"].includes(relayerType))) return [3 /*break*/, 3];
                            return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, l1ChainId)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            if (executionStrategy) {
                                selectedExecutionStrategy = {
                                    addr: executionStrategy,
                                    params: (0, helpers_1.getExecutionData)(space, executionStrategy, executionDestinationAddress, transactions).executionParams,
                                };
                            }
                            else {
                                selectedExecutionStrategy = {
                                    addr: "0x0000000000000000000000000000000000000000",
                                    params: [],
                                };
                            }
                            data = {
                                space: space.id,
                                proposal: proposalId,
                                authenticator: authenticator,
                                executionStrategy: selectedExecutionStrategy,
                                metadataUri: "ipfs://".concat(cid),
                            };
                            if (relayerType === "starknet") {
                                return [2 /*return*/, starkSigClient.updateProposal({
                                        signer: web3.provider.account,
                                        data: data,
                                    })];
                            }
                            else if (relayerType === "evm") {
                                return [2 /*return*/, ethSigClient.updateProposal({
                                        signer: web3.getSigner(),
                                        data: data,
                                    })];
                            }
                            else if (relayerType === "evm-tx") {
                                return [2 /*return*/, ethTxClient.initializeUpdateProposal(web3.getSigner(), data, {
                                        noWait: isContract,
                                    })];
                            }
                            return [2 /*return*/, client.updateProposal(web3.provider.account, {
                                    data: data,
                                })];
                    }
                });
            });
        },
        cancelProposal: function (web3, proposal) {
            return client.cancelProposal({
                signer: web3.provider.account,
                space: proposal.space.id,
                proposal: proposal.proposal_id,
            });
        },
        vote: function (web3, connectorType, account, proposal, choice) { return __awaiter(_this, void 0, void 0, function () {
            var isContract, _a, relayerType, authenticator, strategies, strategiesWithMetadata, data;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getIsContract(connectorType, account)];
                    case 1:
                        isContract = _b.sent();
                        _a = pickAuthenticatorAndStrategies({
                            authenticators: proposal.space.authenticators,
                            strategies: proposal.strategies,
                            strategiesIndicies: proposal.strategies_indicies,
                            connectorType: connectorType,
                            isContract: isContract,
                        }), relayerType = _a.relayerType, authenticator = _a.authenticator, strategies = _a.strategies;
                        if (!(relayerType && ["evm", "evm-tx"].includes(relayerType))) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, utils_1.verifyNetwork)(web3, l1ChainId)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, Promise.all(strategies.map(function (strategy) { return __awaiter(_this, void 0, void 0, function () {
                            var metadataIndex, metadata;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        metadataIndex = proposal.strategies_indicies.indexOf(
                                        //@ts-expect-error index can be undefined?
                                        strategy.index);
                                        return [4 /*yield*/, (0, helpers_1.parseStrategyMetadata)(
                                            //@ts-expect-error index can be undefined?
                                            proposal.space.strategies_parsed_metadata[metadataIndex].payload)];
                                    case 1:
                                        metadata = _a.sent();
                                        return [2 /*return*/, __assign(__assign({}, strategy), { metadata: metadata })];
                                }
                            });
                        }); }))];
                    case 4:
                        strategiesWithMetadata = _b.sent();
                        data = {
                            space: proposal.space.id,
                            authenticator: authenticator,
                            strategies: strategiesWithMetadata,
                            proposal: proposal.proposal_id,
                            choice: (0, helpers_1.getSdkChoice)(choice),
                        };
                        if (relayerType === "starknet") {
                            return [2 /*return*/, starkSigClient.vote({
                                    signer: web3.provider.account,
                                    //@ts-expect-error index can be undefined?
                                    data: data,
                                })];
                        }
                        else if (relayerType === "evm") {
                            return [2 /*return*/, ethSigClient.vote({
                                    signer: web3.getSigner(),
                                    //@ts-expect-error index can be undefined?
                                    data: data,
                                })];
                        }
                        else if (relayerType === "evm-tx") {
                            //@ts-expect-error index can be undefined?
                            return [2 /*return*/, ethTxClient.initializeVote(web3.getSigner(), data, {
                                    noWait: isContract,
                                })];
                        }
                        return [2 /*return*/, client.vote(web3.provider.account, {
                                //@ts-expect-error index can be undefined?
                                data: data,
                            })];
                }
            });
        }); },
        finalizeProposal: function () { return null; },
        executeTransactions: function (web3, proposal) { return __awaiter(_this, void 0, void 0, function () {
            var executionData;
            return __generator(this, function (_a) {
                executionData = (0, helpers_1.getExecutionData)(proposal.space, proposal.execution_strategy, proposal.execution_destination, (0, transactions_1.convertToMetaTransactions)(proposal.execution));
                return [2 /*return*/, (0, mana_1.executionCall)("stark", chainId, "execute", {
                        space: proposal.space.id,
                        proposalId: proposal.proposal_id,
                        executionParams: executionData.executionParams,
                    })];
            });
        }); },
        executeQueuedProposal: function (web3, proposal) { return __awaiter(_this, void 0, void 0, function () {
            var activeVotingStrategies, proposalData, votesFor, votesAgainst, votesAbstain, executionParams, executionHash;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                if (!proposal.execution_destination)
                    throw new Error("Execution destination is missing");
                activeVotingStrategies = proposal.strategies_indicies.reduce(function (acc, index) {
                    return acc | (1n << BigInt(index));
                }, 0n);
                proposalData = {
                    startTimestamp: BigInt(proposal.start),
                    minEndTimestamp: BigInt(proposal.min_end),
                    maxEndTimestamp: BigInt(proposal.max_end),
                    finalizationStatus: 0,
                    executionPayloadHash: proposal.execution_hash,
                    executionStrategy: proposal.execution_strategy,
                    authorAddressType: 1, // <- hardcoded, needs to be indexed (0 for starknet, 1 for ethereum)
                    author: proposal.author.id,
                    activeVotingStrategies: activeVotingStrategies,
                };
                votesFor = BigInt((_a = proposal.scores[0]) !== null && _a !== void 0 ? _a : 0);
                votesAgainst = BigInt((_b = proposal.scores[1]) !== null && _b !== void 0 ? _b : 0);
                votesAbstain = BigInt((_c = proposal.scores[2]) !== null && _c !== void 0 ? _c : 0);
                executionParams = (0, helpers_1.getExecutionData)(proposal.space, proposal.execution_strategy, proposal.execution_destination, (0, transactions_1.convertToMetaTransactions)(proposal.execution)).executionParams;
                executionHash = "".concat(executionParams[2]).concat((_d = executionParams[1]) === null || _d === void 0 ? void 0 : _d.slice(2));
                return [2 /*return*/, l1ExecutorClient.execute({
                        signer: web3.getSigner(),
                        executor: proposal.execution_destination,
                        space: proposal.space.id,
                        proposal: proposalData,
                        votesFor: votesFor,
                        votesAgainst: votesAgainst,
                        votesAbstain: votesAbstain,
                        executionHash: executionHash,
                        transactions: (0, transactions_1.convertToMetaTransactions)(proposal.execution),
                    })];
            });
        }); },
        //@ts-expect-error TODO
        vetoProposal: function () { return null; },
        setVotingDelay: function (web3, space, votingDelay) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, client.setVotingDelay({
                        signer: web3.provider.account,
                        space: space.id,
                        votingDelay: votingDelay,
                    })];
            });
        }); },
        setMinVotingDuration: function (web3, space, minVotingDuration) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, client.setMinVotingDuration({
                        signer: web3.provider.account,
                        space: space.id,
                        minVotingDuration: minVotingDuration,
                    })];
            });
        }); },
        setMaxVotingDuration: function (web3, space, maxVotingDuration) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, client.setMaxVotingDuration({
                        signer: web3.provider.account,
                        space: space.id,
                        maxVotingDuration: maxVotingDuration,
                    })];
            });
        }); },
        transferOwnership: function (web3, space, owner) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, client.transferOwnership({
                        signer: web3.provider.account,
                        space: space.id,
                        owner: owner,
                    })];
            });
        }); },
        updateStrategies: function (web3, space, authenticatorsToAdd, authenticatorsToRemove, votingStrategiesToAdd, votingStrategiesToRemove, validationStrategy) { return __awaiter(_this, void 0, void 0, function () {
            var metadataUris, proposalValidationStrategyMetadataUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(votingStrategiesToAdd.map(function (config) { return (0, helpers_1.buildMetadata)(helpers, config); }))];
                    case 1:
                        metadataUris = _a.sent();
                        return [4 /*yield*/, (0, helpers_1.buildMetadata)(helpers, validationStrategy)];
                    case 2:
                        proposalValidationStrategyMetadataUri = _a.sent();
                        return [2 /*return*/, client.updateSettings({
                                signer: web3.provider.account,
                                space: space.id,
                                settings: {
                                    authenticatorsToAdd: authenticatorsToAdd.map(function (config) { return config.address; }),
                                    authenticatorsToRemove: space.authenticators.filter(function (authenticator, index) { return authenticatorsToRemove.includes(index); }),
                                    votingStrategiesToAdd: votingStrategiesToAdd.map(function (config) { return ({
                                        addr: config.address,
                                        params: config.generateParams
                                            ? config.generateParams(config.params)
                                            : [],
                                    }); }),
                                    votingStrategiesToRemove: votingStrategiesToRemove.map(function (index) { var _a; return (_a = space.strategies_indicies[index]) !== null && _a !== void 0 ? _a : 0; }),
                                    votingStrategyMetadataUrisToAdd: metadataUris,
                                    proposalValidationStrategy: {
                                        addr: validationStrategy.address,
                                        params: validationStrategy.generateParams
                                            ? validationStrategy.generateParams(validationStrategy.params)
                                            : [],
                                    },
                                    proposalValidationStrategyMetadataUri: proposalValidationStrategyMetadataUri,
                                },
                            })];
                }
            });
        }); },
        delegate: function (web3, space, networkId, delegatee, delegationContract) { return __awaiter(_this, void 0, void 0, function () {
            var _a, contractAddress, account;
            return __generator(this, function (_b) {
                _a = delegationContract.split(":"), contractAddress = _a[1];
                account = web3.provider.account;
                return [2 /*return*/, account.execute({
                        contractAddress: contractAddress,
                        entrypoint: "delegate",
                        calldata: starknet_1.CallData.compile({
                            delegatee: delegatee,
                        }),
                    })];
            });
        }); },
        getVotingPower: function (spaceId, strategiesAddresses, strategiesParams, strategiesMetadata, voterAddress, snapshotInfo) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(strategiesAddresses.map(function (address, i) { return __awaiter(_this, void 0, void 0, function () {
                        var strategy, strategyMetadata, value;
                        var _a, _b, _c, _d, _e, _f;
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    strategy = (0, sx_1.getStarknetStrategy)(address, networkConfig);
                                    if (!strategy)
                                        return [2 /*return*/, { address: address, value: 0n, decimals: 0, token: null, symbol: "" }];
                                    return [4 /*yield*/, (0, helpers_1.parseStrategyMetadata)(
                                        //@ts-expect-error
                                        strategiesMetadata[i].payload)];
                                case 1:
                                    strategyMetadata = _g.sent();
                                    return [4 /*yield*/, strategy.getVotingPower(address, voterAddress, strategyMetadata, snapshotInfo.at, strategiesParams[i].split(","), __assign(__assign({}, clientConfig), { networkConfig: networkConfig }))];
                                case 2:
                                    value = _g.sent();
                                    return [2 /*return*/, {
                                            address: address,
                                            value: value,
                                            decimals: (_b = (_a = strategiesMetadata[i]) === null || _a === void 0 ? void 0 : _a.decimals) !== null && _b !== void 0 ? _b : 0,
                                            symbol: (_d = (_c = strategiesMetadata[i]) === null || _c === void 0 ? void 0 : _c.symbol) !== null && _d !== void 0 ? _d : "",
                                            token: (_f = (_e = strategiesMetadata[i]) === null || _e === void 0 ? void 0 : _e.token) !== null && _f !== void 0 ? _f : null,
                                        }];
                            }
                        });
                    }); }))];
            });
        }); },
        send: function (envelope) { return starkSigClient.send(envelope); }, // TODO: extract it out of client to common helper
    };
}
