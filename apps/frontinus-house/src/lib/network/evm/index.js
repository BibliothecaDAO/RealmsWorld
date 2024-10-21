"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.METADATA = void 0;
exports.createEvmNetwork = createEvmNetwork;
var networks_json_1 = require("@/data/networks.json");
var provider_1 = require("@/lib/provider");
var common_1 = require("../common");
var constants_1 = require("../common/constants");
var actions_1 = require("./actions");
// shared for both ETH mainnet and ARB1
var ETH_MAINNET_BLOCK_TIME = 12.09;
exports.METADATA = {
    eth: {
        name: "Ethereum",
        chainId: 1,
        apiUrl: "https://api.studio.thegraph.com/query/23545/sx/version/latest",
        avatar: "ipfs://bafkreid7ndxh6y2ljw2jhbisodiyrhcy2udvnwqgon5wgells3kh4si5z4",
        blockTime: ETH_MAINNET_BLOCK_TIME,
    },
    sep: {
        name: "Ethereum Sepolia",
        chainId: 11155111,
        apiUrl: (_a = import.meta.env.VITE_EVM_SEPOLIA_API) !== null && _a !== void 0 ? _a : "https://api.studio.thegraph.com/query/23545/sx-sepolia/version/latest",
        avatar: "ipfs://bafkreid7ndxh6y2ljw2jhbisodiyrhcy2udvnwqgon5wgells3kh4si5z4",
        blockTime: 13.2816,
    },
};
function createEvmNetwork(networkId) {
    var _a = exports.METADATA[networkId], name = _a.name, chainId = _a.chainId, currentChainId = _a.currentChainId, apiUrl = _a.apiUrl, avatar = _a.avatar;
    var provider = (0, provider_1.getProvider)(chainId);
    var api = (0, common_1.createApi)(apiUrl, networkId, {
        highlightApiUrl: import.meta.env.VITE_HIGHLIGHT_URL,
    });
    var helpers = {
        waitForTransaction: function (txId) { return provider.waitForTransaction(txId); },
        getExplorerUrl: function (id, type) {
            var dataType = "tx";
            if (type === "token")
                dataType = "token";
            else if (["address", "contract", "strategy"].includes(type))
                dataType = "address";
            //@ts-expect-error json
            return "".concat(networks_json_1.default[chainId].explorer, "/").concat(dataType, "/").concat(id);
        },
    };
    return {
        name: name,
        avatar: avatar,
        currentUnit: "block",
        chainId: chainId,
        baseChainId: chainId,
        currentChainId: currentChainId !== null && currentChainId !== void 0 ? currentChainId : chainId,
        supportsSimulation: ["eth", "sep"].includes(networkId),
        managerConnectors: constants_1.EVM_CONNECTORS,
        //@ts-expect-error incorrect helpers TODO
        actions: (0, actions_1.createActions)(provider, helpers, chainId),
        api: api,
        //@ts-expect-error incorrect helpers TODO
        helpers: helpers,
    };
}
