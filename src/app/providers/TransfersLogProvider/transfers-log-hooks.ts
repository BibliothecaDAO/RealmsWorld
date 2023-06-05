import { useContext, useMemo } from 'react';

import { TransfersLogContext } from './transfers-log-context';

export const useTransfersLog = () => useContext(TransfersLogContext);

export const useAccountTransfersLog = (account: `0x${string}`) => {
    const { transfers } = useTransfersLog();
    return useMemo(
        () => transfers.filter((tx: any) => tx.sender === account || tx.recipient === account),
        [account, transfers]
    );
};