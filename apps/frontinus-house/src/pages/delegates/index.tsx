import { Layout, LayoutBody } from "@/components/layout";
import { useSpace } from "@/components/space-provider";
import { useState } from "react";
import { SpaceDelegates } from "./space-delegates";

export default function Delegates() {
    const{space} = useSpace()
    const [activeDelegationId, setActiveDelegationId] = useState(0);

    const delegateData = space?.delegations[activeDelegationId]

  return (
    <Layout>
      <LayoutBody className="flex flex-col" fixedHeight>
        <div className="px-4"><h1>Delegates</h1></div>
        {delegateData && (
          <SpaceDelegates delegation={delegateData} />
        )}
      </LayoutBody>
    </Layout>
  );
}
