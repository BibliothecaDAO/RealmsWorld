import { useEffect, useState } from "react";

export const useLordsPrice = () => {
  const [lordsPrice, setLordsPrice] = useState(0);
  async function getLordsPrice() {
    const url = `https://api.ethplorer.io/getTokenInfo/0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_APIKEY}`;
    await fetch(url)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      })
      .then((data: { price: { rate: number } }) => {
        setLordsPrice(Number(data.price?.rate.toFixed(2)));
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
