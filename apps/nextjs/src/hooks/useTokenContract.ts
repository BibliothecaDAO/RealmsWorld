'use client'
import { useContractRead, useAccount as useL1Account, useContractWrite as useL1ContractWrite, useBalance } from 'wagmi';
import { useAccount as useL2Account } from "@starknet-react/core";

import { ERC20 as L1_ERC20_ABI } from '@/abi/L1/ERC20'
import L2_C1ERC20 from "@/abi/L2/C1ERC20.json";
import L2_ERC20 from "@/abi/L2/ERC20.json";

import { ChainType, tokens } from '@/constants/tokens';
import {
    useConnectors,
    useAccount,
    useStarkName,
    useContractRead as useL2ContractRead,
    useNetwork,
} from "@starknet-react/core";
import { isEth } from '@/utils/utils';


export const useTokenContractAPI = (symbol: 'LORDS' | 'ETH', spender?: boolean | string) => {
    const network =
        process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN"
    /*const l1BridgeAddress = tokens.L1.LORDS.bridgeAddress?.[ChainType.L1[network]] as `0x${string}`
    const l1LordsAddress = tokens.L1.LORDS.tokenAddress?.[ChainType.L1[network]]
    const l2BridgeAddress = tokens.L2.LORDS.bridgeAddress?.[ChainType.L2[network]]
    const l2LordsAddress = tokens.L2.LORDS.tokenAddress?.[ChainType.L2[network]]*/

    const l1Token = tokens.L1[symbol]
    const l2Token = tokens.L2[symbol]

    const { address: l1Account } = useL1Account()
    const { address: l2Account } = useL2Account()

    const l1ERC20Contract = {
        address: isEth(symbol) ? '0x0000000000000000' : l1Token.tokenAddress[ChainType.L1[network]] as `0x${string}`,
        abi: L1_ERC20_ABI,
    }

    const { writeAsync: approve, data: approveHash, isLoading: approveWriteLoading } = useL1ContractWrite({
        ...l1ERC20Contract,
        functionName: "approve",
    })

    const { data: allowance/*, isError, isLoading */ } = useContractRead({
        ...l1ERC20Contract,
        functionName: 'allowance',
        args: [l1Account as `0x${string}`, (spender == true ? l1Token.bridgeAddress[ChainType.L1[network]] : spender) as `0x${string}`],
        enabled: !!(l1Account && spender),
    })
    return {
        approve,
        approveWriteLoading,
        approveHash,
        allowance,
    };
};