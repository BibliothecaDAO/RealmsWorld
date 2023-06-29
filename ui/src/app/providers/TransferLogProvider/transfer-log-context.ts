'use client'
import { Deposit, DepositsQuery, L2WithdrawalsQuery, Withdrawal, WithdrawalsQuery } from '@/.graphclient';
import { UseInfiniteQueryResult, UseQueryResult } from '@tanstack/react-query';
import { createContext } from 'react';

interface TransferLogContextValue {
    transfersQueryL1: UseInfiniteQueryResult<DepositsQuery>,
    transfersQueryL2: UseInfiniteQueryResult<L2WithdrawalsQuery>,
    pendingWithdrawalsQuery: any
}

export const TransferLogContext = createContext<TransferLogContextValue>({
    transfersQueryL1: {
        // @ts-ignore
        refetch: () => { }
    },
    transfersQueryL2: {
        // @ts-ignore
        refetch: () => { }
    },
    pendingWithdrawalsQuery: {
        // @ts-ignore
        refetch: () => { }
    }
});