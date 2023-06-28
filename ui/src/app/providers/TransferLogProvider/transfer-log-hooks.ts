'use client'
import { useContext, useMemo } from 'react';

import { isDeposit } from '@/types/bridge';

import { TransferLogContext } from './transfer-log-context';

export const useTransferLog = (isL1: boolean = true) => {
    const { transfersQueryL1, transfersQueryL2 } = useContext(TransferLogContext);
    const query = isL1 ? transfersQueryL1 : transfersQueryL2;
    return useMemo(
        () => {
            console.log(query)

            return ({
                ...query,
                transfers: isL1 ? flattenPages(query?.data) : flattenWithdrawals(query.data)
            })
        },
        [query]
    );
};

export const useTransfers = () => {
    const {
        transfersQueryL1: { data: transfersL1, isFetching: isFetchingL1 },
        transfersQueryL2: { data: transfersL2, isFetching: isFetchingL2 },
        pendingWithdrawalsQuery: { data: withdrawals, isFetching: isFetchingWithdrawals }
    } = useContext(TransferLogContext);

    const doneFetching = !!(
        !isFetchingL1 &&
        !isFetchingL2 &&
        !isFetchingWithdrawals &&
        transfersL1 &&
        transfersL2 &&
        withdrawals
    );

    return useMemo(() => {
        const removeDuplicatesLogs = (logs: any) => {
            const unique = {};
            //@ts-ignore
            return logs.filter((log) => !unique[log.id] && (unique[log.id] = true));
        };

        const sortLogsAccordingToTimestamp = (logs: any) => {
            //@ts-ignore
            const extractTs = ({ type, l1TxTimestamp, l2TxTimestamp }) => {
                return isDeposit(type) ? l1TxTimestamp : l2TxTimestamp;
            };
            //@ts-ignore
            return logs.sort((a, b) => extractTs(a) - extractTs(b));
        };
        console.log('done' + doneFetching)
        if (doneFetching) {
            console.log(transfersL1)
            const uniqueLogs = removeDuplicatesLogs([
                ...(withdrawals?.pages || []),
                ...flattenPages(transfersL1),
                ...flattenPages(transfersL2)
            ]);
            return sortLogsAccordingToTimestamp(uniqueLogs);
        }
        return [];
    }, [doneFetching]);
};
//@ts-ignore
const flattenPages = data => {
    console.log(data)
    return data ? [...data?.pages?.[0]?.deposits, ...data?.pages?.[0]?.withdrawals] : [] /*&& Array.isArray(data?.pages) && data?.pages.length ? data?.pages?.reduce((prev: any, curr: any) => { return [...prev, ...curr] }, []) : []*/
};
const flattenWithdrawals = (data: any) => {
    console.log(data)
    return data?.pages?.[0]?.withdrawals /*&& Array.isArray(data?.pages) && data?.pages.length ? data?.pages?.reduce((prev: any, curr: any) => { return [...prev, ...curr] }, []) : []*/
};