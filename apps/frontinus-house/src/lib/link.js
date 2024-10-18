"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwapLink = getSwapLink;
var UNISWAP_CHAINS_BY_NETWORK = {
    "1": "mainnet",
    "42161": "arbitrum",
    "10": "optimism",
    "137": "polygon",
    "8453": "base",
    "56": "bnb",
    "43114": "avalanche",
    "42220": "celo",
    "11155111": "sepolia",
    "5": "goerli",
};
function getSwapLink(strategy, address, chainId) {
    if (strategy &&
        address &&
        chainId &&
        [
            "comp",
            "ozVotes",
            "erc20-balance-of",
            "erc20-votes",
            "comp-like-votes",
            "uni",
            "erc20-balance-of-with-delegation",
        ].includes(strategy)) {
        //@ts-expect-error uniswap type network error
        var chain = UNISWAP_CHAINS_BY_NETWORK[chainId];
        return "https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=".concat(address, "&chain=").concat(chain, "&ref=snapshot");
    }
    return;
}
