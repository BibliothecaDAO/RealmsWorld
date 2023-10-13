
import { useCallback, useEffect, useState } from 'react';
//import { constants } from 'starknet';
import { EventName } from '@starkware-industries/commons-js-enums';
import { useAccount as useL2Account } from "@starknet-react/core";
import { useAccount as useL1Account, useWaitForTransaction } from "wagmi";

//import { useSelectedToken } from '../providers/TransferProvider';
import { useBridgeContract } from './useBridgeContract';
import { useTokenContractAPI } from './useTokenContract';
/*import { useTransferToL2Tracking } from './useTracking';
import { useTransfer } from './useTransfer';
import { useIsMaxTotalBalanceExceeded } from './useIsMaxTotalBalanceExceeded';
import { useTransfersLog } from '../providers/TransfersLogProvider';*/

import { ChainType, tokens } from '@/constants/tokens';
import { TransferStep, TransferToL2Steps, ActionType } from '@/constants/transferSteps';
import { useTransfer } from './useTransfer';
import { useTransferProgress } from './useTransferProgress';
import { useTransferLog } from '@/app/providers/TransferLogProvider';
import { formatEther, parseGwei, parseUnits } from 'viem';

export const TransferError = {
    TRANSACTION_ERROR: 0,
    MAX_TOTAL_BALANCE_ERROR: 1
};

export const stepOf = (step: any, steps: any) => {
    return steps.indexOf(step);
};

export const useTransferToL2 = () => {
    const [amount, setAmount] = useState('')
    //onst [trackInitiated, trackSuccess, trackError, trackReject] = useTransferToL2Tracking();
    const { deposit, depositIsSuccess, error: depositError, depositTxStatus, depositReceipt } = useBridgeContract();


    const { allowance, approve, approveHash } = useTokenContractAPI("LORDS", true);
    const { data, isError, isSuccess: approveIsSuccess } = useWaitForTransaction({
        hash: approveHash?.hash
    })

    const { address: l1Account, connector } = useL1Account();
    const { address: l2Account } = useL2Account();
    const { handleProgress, handleData, handleError } = useTransfer(TransferToL2Steps);
    const progressOptions = useTransferProgress();

    const { refetch } = useTransferLog();
    const network =
        process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN";
    const tokenAddressL2 = tokens.L2.LORDS.tokenAddress?.[ChainType.L2[network]]
    const l1BridgeAddress = tokens.L1.LORDS.bridgeAddress?.[ChainType.L1[network]] as `0x${string}`

    const onTransactionHash = (error: any, transactionHash: string, amount: string) => {
        if (!error) {
            console.log('Tx signed', { transactionHash, amount });
            handleProgress(
                progressOptions.deposit(amount, 'Lords', stepOf(TransferStep.DEPOSIT, TransferToL2Steps))
            );
        }
    };

    const toObject = (object: any) => {
        return JSON.parse(JSON.stringify(object, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));
    }

    const onDeposit = (event: any) => {
        console.log('Deposit event dispatched', event);
        //trackSuccess(event.transactionHash);
        const transferData = {
            type: ActionType.TRANSFER_TO_L2,
            sender: l1Account,
            recipient: l2Account,
            l1hash: event.transactionHash,
            name: 'Lords',
            symbol: 'LORDS',
            amount: amount.toString(),
            event
        };
        //addTransfer(toObject(transferData));
        refetch()
        handleData(transferData);
    };
    useEffect(() => {
        if (depositError) {
            handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, depositError))
        }
    }, [depositError])

    const sendDeposit = async (amount: any) => {
        handleProgress(
            progressOptions.waitForConfirm(
                connector?.name || 'Wallet',
                stepOf(TransferStep.CONFIRM_TX, TransferToL2Steps)
            )
        );
        const { hash } = await deposit({
            args: [parseUnits(amount, 18), BigInt(l2Account || "0x"), BigInt(1)],
            value: BigInt(1),
        });
        onTransactionHash(depositError, hash, amount)
    }

    useEffect(() => {
        if (approveIsSuccess) {
            sendDeposit(amount)
        }
    }, [approveIsSuccess])

    useEffect(() => {
        if (depositIsSuccess) {
            onDeposit(depositReceipt)
        }
    }, [depositIsSuccess])

    return useCallback(
        async (amount: any) => {
            setAmount(amount)
            try {
                console.log('TransferToL2 called');

                console.log('Token needs approval');
                handleProgress(
                    progressOptions.approval('Lords', stepOf(TransferStep.APPROVE, TransferToL2Steps))
                );
                console.log('Current allow value', allowance?.toString());
                if (Number(formatEther(allowance || BigInt(0))) < Number(amount)) {
                    console.log('Allow value is smaller then amount, sending approve tx...', { amount, l1BridgeAddress });
                    approve({
                        args: [l1BridgeAddress, parseGwei(amount)],
                    })
                }
                if (allowance && Number(formatEther(allowance)) >= Number(amount)) {
                    console.log('Calling deposit');
                    sendDeposit(amount)
                }
            } catch (ex: any) {
                //trackError(ex);
                console.error(ex?.message, ex);
                handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, ex));
            }
        },
        [deposit, l2Account, progressOptions, l1Account, allowance, approve, l1BridgeAddress]
    );
};