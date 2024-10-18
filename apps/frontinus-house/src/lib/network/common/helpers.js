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
exports.getSdkChoice = getSdkChoice;
exports.getExecutionData = getExecutionData;
exports.parseStrategyMetadata = parseStrategyMetadata;
exports.buildMetadata = buildMetadata;
exports.createStrategyPicker = createStrategyPicker;
var utils_1 = require("@/lib/utils");
var sx_1 = require("@snapshot-labs/sx");
//import { MetaTransaction } from '@snapshot-labs/sx/dist/utils/encoding/execution-hash';
var constants_1 = require("./constants");
function getSdkChoice(choice) {
    if (choice === "for")
        return sx_1.Choice.For;
    if (choice === "against")
        return sx_1.Choice.Against;
    return sx_1.Choice.Abstain;
}
function getExecutionData(space, executionStrategy, destinationAddress, transactions) {
    var supportedExecutionIndex = space.executors.findIndex(function (executor) { return executor === executionStrategy; });
    if (supportedExecutionIndex === -1) {
        throw new Error("No supported executor configured for this space");
    }
    var executorType = space.executors_types[supportedExecutionIndex];
    return (0, sx_1.getExecutionData)(executorType, executionStrategy, {
        transactions: transactions,
        destination: destinationAddress || undefined,
    });
}
function parseStrategyMetadata(metadata) {
    return __awaiter(this, void 0, void 0, function () {
        var strategyUrl, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (metadata === null)
                        return [2 /*return*/, null];
                    if (!metadata.startsWith("ipfs://"))
                        return [2 /*return*/, JSON.parse(metadata)];
                    strategyUrl = (0, utils_1.getUrl)(metadata);
                    if (!strategyUrl)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, fetch(strategyUrl)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
function buildMetadata(helpers, config) {
    return __awaiter(this, void 0, void 0, function () {
        var metadata, pinned;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!config.generateMetadata)
                        return [2 /*return*/, ""];
                    return [4 /*yield*/, config.generateMetadata(config.params)];
                case 1:
                    metadata = _a.sent();
                    return [4 /*yield*/, helpers.pin(metadata)];
                case 2:
                    pinned = _a.sent();
                    return [2 /*return*/, "ipfs://".concat(pinned.cid)];
            }
        });
    });
}
function createStrategyPicker(_a) {
    var helpers = _a.helpers, managerConnectors = _a.managerConnectors, _b = _a.lowPriorityAuthenticators, lowPriorityAuthenticators = _b === void 0 ? [] : _b;
    return function pick(_a) {
        var authenticators = _a.authenticators, strategies = _a.strategies, strategiesIndicies = _a.strategiesIndicies, isContract = _a.isContract, connectorType = _a.connectorType;
        var authenticatorsInfo = __spreadArray([], authenticators, true).filter(function (authenticator) {
            return isContract
                ? helpers.isAuthenticatorContractSupported(authenticator)
                : helpers.isAuthenticatorSupported(authenticator);
        })
            .sort(function (a, b) {
            var aRelayer = helpers.getRelayerAuthenticatorType(a);
            var bRelayer = helpers.getRelayerAuthenticatorType(b);
            var aLowPriority = aRelayer && lowPriorityAuthenticators.includes(aRelayer);
            var bLowPriority = bRelayer && lowPriorityAuthenticators.includes(bRelayer);
            if (aLowPriority && !bLowPriority) {
                return 1;
            }
            if (!aLowPriority && bLowPriority) {
                return -1;
            }
            if (aRelayer && bRelayer) {
                return 0;
            }
            if (aRelayer) {
                return -1;
            }
            if (bRelayer) {
                return 1;
            }
            return 0;
        })
            .map(function (authenticator) {
            var relayerType = helpers.getRelayerAuthenticatorType(authenticator);
            var connectors = [];
            if (relayerType && ["evm", "evm-tx"].includes(relayerType))
                connectors = constants_1.EVM_CONNECTORS;
            else if (relayerType === "starknet")
                connectors = constants_1.STARKNET_CONNECTORS;
            else
                connectors = managerConnectors;
            return {
                authenticator: authenticator,
                relayerType: relayerType,
                connectors: connectors,
            };
        });
        var authenticatorInfo = authenticatorsInfo.find(function (_a) {
            var connectors = _a.connectors;
            return connectors.includes(connectorType);
        });
        var selectedStrategies = strategies
            .map(function (strategy, index) {
            return ({ address: strategy, index: strategiesIndicies[index] });
        })
            .filter(function (_a) {
            var address = _a.address;
            return helpers.isStrategySupported(address);
        });
        if (!authenticatorInfo ||
            (strategies.length !== 0 && selectedStrategies.length === 0)) {
            throw new Error("Unsupported space");
        }
        return {
            relayerType: authenticatorInfo.relayerType,
            authenticator: authenticatorInfo.authenticator,
            strategies: selectedStrategies,
        };
    };
}
