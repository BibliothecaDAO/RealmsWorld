/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useEffect, useState } from "react";

interface LordsInformation {
  holderCount: number;
  usdPrice: number;
  marketCap: number;
  diff: number;
  diff7d: number;
  diff30d: number;
  volume24hr: number;
}

export async function getLordsPrice() {
  const url = `https://api.ethplorer.io/getTokenInfo/0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_APIKEY}`;
  const data = await fetch(url)
  const json = await data.json()

      // setLordsPrice(Number(data.price?.rate.toFixed(2)));
      return ({
        holderCount: json.holdersCount,
        usdPrice: Number(json.price.rate.toFixed(2)),
        marketCap: Number(json.price.marketCapUsd.toFixed(2)),
        diff: Number(json.price.volDiff1.toFixed(2)),
        diff7d: Number(json.price.volDiff7.toFixed(2)),
        diff30d: Number(json.price.volDiff30.toFixed(2)),
        volume24hr: Number(json.price.volume24h.toFixed(2)),
      });
    }

export const useLordsPrice = () => {
  const [lordsPrice, setLordsPrice] = useState<LordsInformation>({
    holderCount: 0,
    usdPrice: 0,
    marketCap: 0,
    diff: 0,
    diff7d: 0,
    diff30d: 0,
    volume24hr: 0,
  });


  return { lordsPrice };
};
