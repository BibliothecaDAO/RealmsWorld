"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_VOTING_TYPES = exports.BASIC_CHOICES = exports.MAX_SYMBOL_LENGTH = exports.COINGECKO_BASE_ASSETS = exports.COINGECKO_ASSET_PLATFORMS = exports.CHAIN_IDS = exports.ETH_CONTRACT = void 0;
exports.ETH_CONTRACT = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
exports.CHAIN_IDS = {
    matic: 137,
    arb1: 42161,
    oeth: 10,
    eth: 1,
    gor: 5,
    sep: 11155111,
    'linea-testnet': 59140
};
exports.COINGECKO_ASSET_PLATFORMS = {
    1: 'ethereum',
    10: 'optimistic-ethereum',
    137: 'polygon-pos',
    42161: 'arbitrum-one'
};
exports.COINGECKO_BASE_ASSETS = {
    1: 'ethereum',
    10: 'ethereum',
    137: 'matic-network',
    42161: 'ethereum'
};
exports.MAX_SYMBOL_LENGTH = 12;
exports.BASIC_CHOICES = ['For', 'Against', 'Abstain'];
exports.SUPPORTED_VOTING_TYPES = [
    'basic',
    'single-choice',
    'approval',
    'ranked-choice',
    'weighted',
    'quadratic'
];
