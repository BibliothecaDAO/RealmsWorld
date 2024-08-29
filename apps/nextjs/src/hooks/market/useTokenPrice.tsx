import { getL2Rpc } from "@/constants/env";
import { useEffect, useState } from "react";
import { BlockTag } from "starknet";

const ETH_DECIMALS = 18;
const DEFAULT_DECIMALS_HEX = "0x12";

// Converts a string hex amount to a decimal number
// - amount: string hex amount
// - currency_address: string address of the currency
export function useTokenPrice(amount: string, currency_address: string | null) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    async function fetchPrice() {
      if (currency_address === null) {
        setPrice(parseInt(amount, 16) / Math.pow(10, ETH_DECIMALS));
        return;
      }
      const rpcProvider = getL2Rpc();
      const res = await rpcProvider.callContract({
        contractAddress: currency_address,
        entrypoint: "decimals",
      }, BlockTag.LATEST)
      // if there's an error we use de default decimals of 18 : 0x12 in hex
      const dec = res[0] ?? DEFAULT_DECIMALS_HEX;
      setPrice(parseInt(amount, 16) / Math.pow(10, parseInt(dec, 16)));
    }

    fetchPrice().catch(console.error)

  }, [amount, currency_address])

  return price;
}
