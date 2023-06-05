import { useEffect } from 'react';
import { useWalletsProviderContext } from '@/app/providers/WalletsProvider';
import { useAccount } from 'wagmi'

export const useAccountChange = (fn, deps = []) => {
    const { isConnected } = useAccount()
    const { accountHash } = useWalletsProviderContext();

    useEffect(() => {
        console.log('account change ' + accountHash)
        // either disconnecting the wallet or connecting and web3 is ready do use
        if (!accountHash) {
            const unmountFn = fn(accountHash);
            return () => {
                unmountFn && unmountFn();
            };
        }
    }, [accountHash]);
};