import { useEffect, useState } from "react";
import { Layout, LayoutBody } from "@/components/layout";
import { getNetwork } from "@/lib/network";
import { getProposalId, shorten } from "@/lib/utils";
import type { Proposal as ProposalType } from "@/types";

import Overview from "./overview";

export default function Proposal() {
  const [proposal, setProposal] = useState<ProposalType | null>(null);
  console.log("got here");
  useEffect(() => {
    const fetchProposals = async () => {
      const proposalsData = await getNetwork("sn-sep").api.loadProposal(
        "0x0011c8d7674bb371708933d29c5e2a4ea31a6535809950b863851373f1afc112",
        1,
        0,
      );
      setProposal(proposalsData);
    };
    fetchProposals();
  }, []);

  console.log(proposal);
  return (
    <Layout>
      <LayoutBody className="mx-auto flex max-w-[660px] flex-col" fixedHeight>
        <div className="w-full px-4">
          <h1 className="text-lg uppercase text-muted">Proposal</h1>
        </div>
        <hr />
        {proposal ? <Overview proposal={proposal} /> : "Loading"}
      </LayoutBody>
    </Layout>
  );
}
