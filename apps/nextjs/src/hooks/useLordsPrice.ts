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
  async function getLordsPrice() {
    const url = `https://api.ethplorer.io/getTokenInfo/0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_APIKEY}`;
    await fetch(url)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      })
      .then((data) => {
        console.log(data);
        // setLordsPrice(Number(data.price?.rate.toFixed(2)));
        // @ts-ignore
        setLordsPrice({
          holderCount: data.holdersCount,
          usdPrice: Number(data.price.rate.toFixed(2)),
          marketCap: Number(data.price.marketCapUsd.toFixed(2)),
          diff: Number(data.price.volDiff1.toFixed(2)),
          diff7d: Number(data.price.volDiff7.toFixed(2)),
          diff30d: Number(data.price.volDiff30.toFixed(2)),
          volume24hr: Number(data.price.volume24h.toFixed(2)),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getLordsPrice();
  }, []);

  return { lordsPrice };
};
