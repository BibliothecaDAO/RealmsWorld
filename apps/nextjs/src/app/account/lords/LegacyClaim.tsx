import { useStaking } from "@/hooks/staking/useStaking";
import LordsIcon from "@/icons/lords.svg";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@realms-world/ui";

export const LegacyClaim = () => {
  const {
    galleonLordsAvailable,
    carrackLordsAvailable,
    totalClaimable,
    poolV1Balance,
    poolV2Balance,
  } = useStaking();
  return (
    <Accordion className="col-span-full" type="multiple">
      <AccordionItem value={"lords"} className="mb-2">
        <AccordionTrigger className="flex w-full border p-4 text-xl">
          <div className="flex justify-start">
            Legacy (L1) Claimable Lords:{" "}
            <span className="ml-8 flex items-center">
              <LordsIcon className="mr-3 h-5 w-5 fill-primary" />
              {totalClaimable.toString()}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="border border-y-0 bg-background p-4">
          <div className="grid text-lg">
            <div className="font-sans text-xl font-semibold">Galleon</div>
            <dl className="grid gap-1">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Epoch 0-10:</dt>
                <dd>
                  {galleonLordsAvailable?.toLocaleString()}{" "}
                  {galleonLordsAvailable && galleonLordsAvailable > 0 ? (
                    <Button className="ml-3" size={"xs"}>
                      Claim
                    </Button>
                  ) : null}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Epoch 11-35:</dt>
                <dd>{poolV1Balance?.toLocaleString() ?? 0}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Epoch 36-109:</dt>
                <dd>{poolV2Balance.toLocaleString()}</dd>
              </div>
            </dl>
            <div className="mt-4 font-sans text-xl font-semibold">Carrack</div>
            <dl className="grid gap-1">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Epoch 11-109:</dt>
                <dd>
                  {carrackLordsAvailable?.toLocaleString() ?? 0}
                  {carrackLordsAvailable && (
                    <Button className="ml-3" size={"sm"}>
                      Claim
                    </Button>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
