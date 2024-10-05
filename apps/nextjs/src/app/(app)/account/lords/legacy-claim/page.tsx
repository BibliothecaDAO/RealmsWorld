import type { Metadata } from "next";
import LordsIcon from "@/icons/lords.svg";
import { LegacyClaim } from "./LegacyClaim";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default function Page() {
  return (
    <div className="px-4 pt-4 md:px-6">
      <div className="w-full">
        <span className="mb-2 flex w-fit items-center pb-4 font-sans text-3xl">
          Legacy Lords Claims
        </span>
        <p className="mb-8">
          Claim Lords Rewards for staking on Ethereum (L1) before August 22nd,
          2024 below.
        </p>
      </div>
      <LegacyClaim />
    </div>
  );
}
