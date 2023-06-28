import { Button } from "@/app/components/ui/button";
import { ETHERSCAN_ACCOUNT_URL, STARKSCAN_ACCOUNT_URL } from "@/constants/env";
import { useAccount } from "wagmi";
import { useAccount as useL2Account } from "@starknet-react/core";
import { ExternalLinkIcon } from "lucide-react";
import { shortenHex } from "@/functions/utils";


export const RenderExplorers = ({isL1 = true}) => {
    const { address } = useAccount();
    const { address: l2address } = useL2Account();

    const explorersL1 = [
        { text: address, url: ETHERSCAN_ACCOUNT_URL(address) },
    ];
    const explorersL2 = [
        { text: l2address, url: STARKSCAN_ACCOUNT_URL(l2address) },
    ];
    const explorers = isL1 ? explorersL1 : explorersL2;

    return (
        <div >
            {explorers.map(({ text, url }, index) => (
                <Button
                    className="mr-2 justify-between normal-case"
                    key={index}
                    size={"xs"}
                    variant={"outline"}
                    href={url}
                >
                    <span>{shortenHex(text || "", 8)} </span>
                    <ExternalLinkIcon className="w-3 h-3 ml-2" />
                </Button>
            ))}
        </div>
    );
};