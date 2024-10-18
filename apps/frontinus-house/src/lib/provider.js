"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvider = getProvider;
var providers_1 = require("@ethersproject/providers");
var providers = {};
function getProvider(networkId) {
    var url = "https://rpc.snapshotx.xyz/".concat(networkId);
    var provider = providers[networkId];
    if (!provider) {
        provider = new providers_1.StaticJsonRpcProvider({ url: url, timeout: 25000 }, networkId);
        providers[networkId] = provider;
    }
    return provider;
}
