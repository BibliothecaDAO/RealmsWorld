import type { Metadata } from "next";
import Link from "next/link";
import Avnu from "@/icons/avnu.svg";

import { SwapTokens } from "./SwapTokens";

export const metadata: Metadata = {
  title: "Realms.World ERC20 Swap",
  description: "Buy LORDS the utility token of Realms.World",
};

export default async function Page() {
  return (
    <div className="container mx-auto mt-24 max-w-[460px] pt-8">
      <p className="mb-6 text-xl">
        Buy LORDS the utility token of Realms.World
      </p>

      <SwapTokens />
      <Link href="https://app.avnu.fi/en?referral=0x049FB4281D13E1f5f488540Cd051e1507149E99CC2E22635101041Ec5E4e4557&amount=100&tokenFrom=0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49&tokenTo=0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7">
        <span className="mt-6 flex justify-end text-bright-yellow/60">
          powered by <Avnu className="ml-2 w-28" />
        </span>
      </Link>
    </div>
  );
}
