import { useContractRead, useContractReads, useAccount as useL1Account, useContractWrite as useL1ContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { lordsERC20 as L1_LORDS_ABI } from '@/abi/L1/LordsERC20'
import L2_ERC20 from "@/abi/L2/C1ERC20.json";

import { ChainType, tokens } from '@/constants/tokens';
import {
    useConnectors,
    useAccount,
    useStarkName,
    useContractRead as useL2ContractRead,
    useNetwork,
    useBalance,
} from "@starknet-react/core";


export const useTokenContractAPI = () => {
    const network =
        process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN";
    const l1BridgeAddress = tokens.L1.LORDS.bridgeAddress?.[ChainType.L1[network]] as `0x${string}`
    const l1LordsAddress = tokens.L1.LORDS.tokenAddress?.[ChainType.L1[network]]
    const l2BridgeAddress = tokens.L2.LORDS.bridgeAddress?.[ChainType.L2[network]]
    const l2LordsAddress = tokens.L2.LORDS.tokenAddress?.[ChainType.L2[network]]

    const { address } = useL1Account()
    const { writeAsync: approve, data: approveHash, isLoading: approveWriteLoading } = useL1ContractWrite({
        address: l1LordsAddress as `0x${string}`,
        abi: L1_LORDS_ABI,
        functionName: "approve",
    })

    const l1LordsContract = {
        address: l1LordsAddress as `0x${string}`,
        abi: L1_LORDS_ABI,
    }
    const { data: l1Data/*, isError, isLoading */ } = useContractReads({
        contracts: [
            {
                ...l1LordsContract,
                functionName: 'allowance',
                args: [address as `0x${string}`, l1BridgeAddress],
            },
            {
                ...l1LordsContract,
                functionName: 'balanceOf',
                args: [address as `0x${string}`],
            }
        ],
        enabled: !!address,
    })

    /*const { data: balanceOfL1, isError, isLoading } = useContractRead({
        address: l1LordsAddress as `0x${string}`,
        abi: L1_LORDS_ABI,
        functionName: 'balanceOf',
        args: [address],
        enabled: !!address,
    })*/
    const {
        data: balanceOfL2,
        isLoading: lordsLoading,
        error,
        refetch: refetchLords,
    } = useL2ContractRead({
        address: l2LordsAddress,
        abi: L2_ERC20,
        functionName: "balance_of",
        args: [address],
        watch: false,
    });

    return {
        approve,
        approveWriteLoading,
        approveHash,
        allowance: l1Data?.[0].result,
        balanceOfL1: l1Data?.[1].result,
        balanceOfL2,/*
        balanceOfEth*/
    };
};