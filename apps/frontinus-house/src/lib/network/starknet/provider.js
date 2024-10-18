"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProvider = createProvider;
var starknet_1 = require("starknet");
function createProvider(nodeUrl) {
    return new starknet_1.RpcProvider({
        nodeUrl: nodeUrl
    });
}
