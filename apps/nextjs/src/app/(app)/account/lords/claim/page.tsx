import type { Metadata } from "next";
import LordsIcon from "@/icons/lords.svg";
import { Overview } from "./Overview";
import Link from "next/link";
import { Badge } from "@realms-world/ui/components/ui/badge";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default function Page() {
  return (
    <div className="px-4 pt-4 md:px-6">
      <div className="mb-4 flex max-w-prose flex-col">
        <span className="mb-2 flex w-fit items-center pb-4 font-sans text-3xl">
          <LordsIcon className="mx-auto mr-2 h-7 w-7 fill-bright-yellow" />
          Lords Rewards For Realms
        </span>
        <p className="text-lg">
          Realms holders who make the{" "}
          <Link href={"/account/assets/realms"}>journey to Starknet</Link> and{" "}
          <Link href={"/account/delegates"}>delegate</Link> their Realms (to
          themselves or others) are rewarded with Lords every block
        </p>

        <div className="relative mb-6 mt-10">
          <div className="absolute inset-0 animate-pulse rounded-lg bg-gradient-to-r from-bright-yellow via-amber-400 to-rose-400 opacity-75 blur-lg"></div>
          <div className="relative flex items-center justify-around rounded-lg border bg-background p-4">
            <span className="font-sans text-lg tracking-wide">Rewards:</span>
            <div className="flex">
              <LordsIcon className="mx-4 h-8 w-8 fill-white" />
              <span className="text-2xl font-bold">49 per Realm each week</span>
            </div>
          </div>
        </div>
      </div>
      <Overview />
    </div>
  );
}
