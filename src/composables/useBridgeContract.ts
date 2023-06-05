import { useMemo, useState } from 'react';
import { StarknetBridgeLords as L1_BRIDGE_ABI } from '@/abi/L1/StarknetBridgeLords'

import { useAccount as useL1Account, useContractWrite as useL1ContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { } from 'wagmi'
import { tokens, ChainType } from '@/constants/tokens';
import { useContractWrite as useL2ContractWrite } from '@starknet-react/core';
import { number, uint256 } from 'starknet';

export const useBridgeContract = () => {
    const [amount, setAmount] = useState(0);
    const { address: addressL1 } = useL1Account();
    const network =
        process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN";
    const l1BridgeAddress = tokens.L1.LORDS.bridgeAddress?.[ChainType.L1[network]]
    const l2BridgeAddress = tokens.L2.LORDS.bridgeAddress?.[ChainType.L2[network]]

    /* const { config: depostConfig } = usePrepareContractWrite({
         address: l1BridgeAddress as `0x${string}`,
         abi: L1_BRIDGE_ABI,
         functionName: "deposit",
         enabled: Boolean(addressL1),
     });*/

    const { writeAsync: deposit, data: depositData, error: depositError } = useL1ContractWrite({
        address: l1BridgeAddress as `0x${string}`,
        abi: L1_BRIDGE_ABI,
        functionName: "deposit",
    })
    const { data: depositReceipt, isLoading, status: depositTxStatus, isSuccess: depositIsSuccess } = useWaitForTransaction({
        hash: depositData?.hash,
    })

    /* const { config: withdrawConfig } = usePrepareContractWrite({
     });*/

    const { write: withdraw } = useL1ContractWrite({
        address: l1BridgeAddress as `0x${string}`,
        abi: L1_BRIDGE_ABI,
        functionName: "withdraw",
    })

    const calls = useMemo(() => {
        const tx = {
            contractAddress: l2BridgeAddress,
            entrypoint: 'initiate_withdrawal',
            calldata: [number.toBN(addressL1).toString(), uint256.bnToUint256(amount ** 18)
            ]
        }
        return Array().fill(tx)
    }, [addressL1, amount, l2BridgeAddress])

    const { write: initiateWithdraw } = useL2ContractWrite({ calls })

    return {
        amount,
        setAmount,
        deposit,
        depositData,
        depositIsSuccess,
        depositError,
        depositTxStatus,
        depositReceipt,
        //depositEth,
        withdraw,
        initiateWithdraw
    };
};