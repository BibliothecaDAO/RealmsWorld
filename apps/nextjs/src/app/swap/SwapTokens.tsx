'use client'
import type { ChangeEvent} from 'react';
import React, { useState } from 'react';
import type { Quote } from "@avnu/avnu-sdk";
import { executeSwap, fetchQuotes } from "@avnu/avnu-sdk";
import { formatUnits, parseUnits } from 'ethers';
import { useAccount } from '@starknet-react/core';
import { NETWORK_NAME, SUPPORTED_L2_CHAIN_ID } from '@/constants/env';
import { LORDS } from '@realms-world/constants';
import { TokenBalance } from '../bridge/TokenBalance';
import { formatEther } from 'viem';
import { useWalletsProviderContext } from '../providers/WalletsProvider';
import { Input } from '@realms-world/ui';

const AVNU_OPTIONS = { baseUrl: `https://${NETWORK_NAME == 'MAIN' ? 'starknet' : 'goerli'}.api.avnu.fi` };

const ethAddress = "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"

export const SwapTokens = () => {    
  const [ sellAmount, setSellAmount ] = useState<string>()
  const [ quotes, setQuotes ] = useState<Quote[]>([])
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ errorMessage, setErrorMessage ] = useState<string>()
  const [ successMessage, setSuccessMessage ] = useState<string>()
  const {account} = useAccount()
  const { balances, l2loading } = useWalletsProviderContext();

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!account) return;
    setErrorMessage('')
    setQuotes([])
    setSellAmount(event.target.value);
    setLoading(true)
    const params = {
      sellTokenAddress: ethAddress,
      buyTokenAddress: LORDS[SUPPORTED_L2_CHAIN_ID]?.address ?? '0x',
      sellAmount: parseUnits(event.target.value, 18),
      takerAddress: account.address,
      size: 1,
    }
    fetchQuotes(params, AVNU_OPTIONS)
      .then((quotes) => {
        setLoading(false)
        setQuotes(quotes)
      })
      .catch(() => setLoading(false));
  }

  const handleSwap = async () => {
    if (!account || !sellAmount || !quotes?.[0]) return;
    setErrorMessage('')
    setSuccessMessage('')
    setLoading(true)
    executeSwap(account, quotes[0], {}, AVNU_OPTIONS)
      .then(() => {
        setSuccessMessage('success')
        setLoading(false)
        setQuotes([])
      })
      .catch((error: Error) => {
        setLoading(false)
        setErrorMessage(error.message)
      });
  }

  /*if (!account) {
    return <button onClick={handleConnect}>Connect Wallet</button>
  }*/

  return (
    <div className='container mx-auto w-96'>
      <div>
        <h2>Sell Token</h2>
        <h3>ETH</h3>
        <TokenBalance
            onClick={() =>
                setSellAmount(
                
                  balances.l2?.eth?.toString() ?? '0'
              )
            }
            balance={
                balances.l2?.eth ?? BigInt(0)

            }
            symbol="Lords"
            isLoading={l2loading && !balances.l2?.lords }
          />
        <Input onChange={handleChangeInput} disabled={loading}/>
      </div>
      <div>&darr;</div>
      <div>
        <h2>Buy Token</h2>
        <h3>Lords</h3>
        <Input
          readOnly
          type="text"
          id="buy-amount"
          value={(quotes?.[0]) ? formatEther(quotes[0].buyAmount) : ''}
        />
      </div>
      {loading ? <p>Loading...</p> : quotes?.[0] && <button onClick={handleSwap}>Swap</button>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>Success</p>}
    </div>
  );
}
