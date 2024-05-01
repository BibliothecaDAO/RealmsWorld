import { useEffect, useState } from "react";
import { Layout, LayoutBody } from "@/components/layout";
import { getNetwork } from "@/lib/network";
import { getProposalId } from "@/lib/utils";
import { Proposal } from "@/types";

export default function Proposals() {
  const [proposals, setProposals] = useState<Proposal[]>();
  console.log("got here");
  useEffect(() => {
    const fetchProposals = async () => {
      const proposalsData = await getNetwork("sn-sep").api.loadProposals(
        ["0x0664207ee8c8687c58a4a72f07152e1e612d5107df894c60501e75a665915bf4"],
        {
          limit: 20,
        },
        0,
        "any",
      );
      setProposals(proposalsData);
    };
    fetchProposals();
  }, []);

  console.log(proposals);
  return (
    <Layout>
      <LayoutBody className="flex flex-col" fixedHeight>
        <div className="px-4"><h1 className="text-lg uppercase text-muted">Proposals</h1></div>
        <hr />
        {proposals
          ? proposals.map((proposal) => {
              return (
                <div>
                  <div className="mx-4 flex border-b py-[14px]">
                    <div className="mr-4 w-0 flex-auto">
                      <div className="flex space-x-2">
                        <div className="my-1 items-center leading-6 md:flex md:min-w-0">
                          <h4 className="my-0">
                            {proposal.title ?? `Proposal #${proposal.id}`}
                          </h4>
                        </div>
                      </div>
                      <div className="inline mr-4">
                        {getProposalId(proposal)} by{" "}
                        {proposal.author.name || proposal.author.id}
                      </div>
                      <span>{proposal.vote_count} votes</span>
                    </div>
                  </div>
                </div>
              );
            })
          : "Loading"}
      </LayoutBody>
    </Layout>
  );
}
