import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { configureChains, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const { chains, provider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API || "" }),
    publicProvider(),
  ]
);