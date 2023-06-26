import { useEffect } from 'react';
import { useWalletsProviderContext } from '@/app/providers/WalletsProvider/WalletsProvider';
import { useAccount } from 'wagmi'

export const useAccountChange = (fn: any, deps = []) => {
    const { address } = useAccount()
    const { accountHash } = useWalletsProviderContext();

    useEffect(() => {
        // either disconnecting the wallet or connecting and web3 is ready do use
        if (!accountHash || address) {
            const unmountFn = fn(accountHash);
            return () => {
                unmountFn && unmountFn();
            };
        }
    }, [accountHash, ...deps, address]);
};