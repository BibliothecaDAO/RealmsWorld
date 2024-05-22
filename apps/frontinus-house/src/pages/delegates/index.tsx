import { useState } from "react";
import { Layout, LayoutBody } from "@/components/layout";
import { useSpace } from "@/components/space-provider";

import { SpaceDelegates } from "./space-delegates";

export default function Delegates() {
  const { space } = useSpace();
  const [activeDelegationId, setActiveDelegationId] = useState(0);

  const delegateData = space?.delegations[activeDelegationId];

  return (
    <Layout>
      <LayoutBody className="flex flex-col" fixedHeight>
        <div className="">
          <h1 className="border-b px-4 font-sans">Delegates</h1>
        </div>
        {delegateData && <SpaceDelegates delegation={delegateData} />}
      </LayoutBody>
    </Layout>
  );
}
