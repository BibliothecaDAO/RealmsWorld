"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportsNullCurrent = exports.enabledReadWriteNetworks = exports.getReadWriteNetwork = exports.getNetwork = exports.evmNetworks = exports.enabledNetworks = void 0;
var starknet_1 = require("./starknet");
var evm_1 = require("./evm");
var starknetNetwork = (0, starknet_1.createStarknetNetwork)("sn");
var starknetSepoliaNetwork = (0, starknet_1.createStarknetNetwork)("sn-sep");
var ethereumNetwork = (0, evm_1.createEvmNetwork)("eth");
var sepoliaNetwork = (0, evm_1.createEvmNetwork)("sep");
exports.enabledNetworks = import.meta.env
    .VITE_ENABLED_NETWORKS
    ? import.meta.env.VITE_ENABLED_NETWORKS.split(",")
    : ["sn", "sn-sep"];
exports.evmNetworks = ["eth", "sep"];
var getNetwork = function (id) {
    if (!exports.enabledNetworks.includes(id))
        throw new Error("Network ".concat(id, " is not enabled"));
    if (id === "eth")
        return ethereumNetwork;
    if (id === "sep")
        return sepoliaNetwork;
    if (id === "sn")
        return starknetNetwork;
    if (id === "sn-sep")
        return starknetSepoliaNetwork;
    throw new Error("Unknown network ".concat(id));
};
exports.getNetwork = getNetwork;
var getReadWriteNetwork = function (id) {
    var network = (0, exports.getNetwork)(id);
    if (network.readOnly)
        throw new Error("Network ".concat(id, " is read-only"));
    return network;
};
exports.getReadWriteNetwork = getReadWriteNetwork;
exports.enabledReadWriteNetworks = exports.enabledNetworks.filter(function (id) { return !(0, exports.getNetwork)(id).readOnly; });
/**
 * supportsNullCurrent return true if the network supports null current to be used for computing current voting power
 * @param networkId Network ID
 * @returns boolean true if the network supports null current
 */
var supportsNullCurrent = function (networkID) {
    return !exports.evmNetworks.includes(networkID);
};
exports.supportsNullCurrent = supportsNullCurrent;
