import { useCallback } from 'react';

//import { useTransfer } from '../providers/TransferProvider';
import { isEth } from '@/app/lib/utils';
import { useTokenContractAPI } from './useTokenContract';
import { useAccount, useContractRead } from '@starknet-react/core';
import { ChainType, tokens } from '@/constants/tokens';
import L2_C1ERC20 from "@/abi/L2/C1ERC20.json";
import L2_ERC20 from "@/abi/L2/ERC20.json";

export const useTokenBalance = (symbol: 'LORDS' | 'ETH') => {
    const getL2TokenBalance = useL2TokenBalance();
    const getL1TokenBalance = useL1TokenBalance(symbol);
    //const { isL1 } = useTransfer();

    return useCallback(
        (tokenAddresses: any) => {
            return [getL1TokenBalance, getL2TokenBalance]
        },
        [getL1TokenBalance, getL2TokenBalance]
    );
};

export const useL2TokenBalance = () => {
    const network =
        process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN"
    const { address: l2Account } = useAccount()
    console.log(l2Account)
    const {
        data: ethBalance,
    } = useContractRead({
        address: tokens.L2['ETH'].tokenAddress[ChainType.L2[network]],
        abi: L2_ERC20,
        functionName: 'balanceOf',
        args: [l2Account],
        watch: false,
    });
    const {
        data: lordsBalance,
    } = useContractRead({
        address: tokens.L2['LORDS'].tokenAddress[ChainType.L2[network]],
        abi: L2_ERC20,
        functionName: "balance_of",
        args: [l2Account],
        watch: false,
    });

    return { ethBalance, lordsBalance }

};

export const useL1TokenBalance = (symbol: 'LORDS' | 'ETH') => {
    const { balanceOfL1, balanceOfEth } = useTokenContractAPI(symbol);
    //return isEth(symbol) ? balanceOfL1?.formatted || 0 : balanceOfEth?.formatted
    return useCallback(
        async (token: { symbol: any; }) => {
            const { symbol } = token;
            return isEth(symbol)
                ? balanceOfEth?.formatted
                : balanceOfL1?.formatted
        },
        [balanceOfL1, balanceOfEth]
    );
};