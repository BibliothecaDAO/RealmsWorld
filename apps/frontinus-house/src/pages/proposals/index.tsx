import { useEffect, useState } from "react";
import { Layout, LayoutBody } from "@/components/layout";
import { getNetwork } from "@/lib/network";
import { getProposalId, shorten } from "@/lib/utils";
import { Proposal } from "@/types";
import { Link } from "react-router-dom";

export default function Proposals() {
  const [proposals, setProposals] = useState<Proposal[]>();
  console.log("got here");
  useEffect(() => {
    const fetchProposals = async () => {
      const proposalsData = await getNetwork("sn-sep").api.loadProposals(
        ["0x00f6fefea3affabce38a3734fb1a9c235dd80243cfca52529545a439d7462cdd"],
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
        <div className="px-4">
          <h1 className="text-lg uppercase text-muted">Proposals</h1>
        </div>
        <hr />
        {proposals
          ? proposals.map((proposal) => {
              return (
                <div>
                  <Link to={`/proposals/${proposal.proposal_id}`}>
                    <div className="mx-4 flex border-b py-[14px]">
                      <div className="mr-4 w-0 flex-auto">
                        <div className="flex space-x-2">
                          <div className="my-1 items-center leading-6 md:flex md:min-w-0">
                            <h4 className="my-0">
                              {proposal.title ?? `Proposal #${proposal.id}`}
                            </h4>
                          </div>
                        </div>
                        <div className="mr-4 inline">
                          {getProposalId(proposal)} by{" "}
                          {proposal.author.name || shorten(proposal.author.id)}
                        </div>
                        <span>{proposal.vote_count} votes</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          : "Loading"}
      </LayoutBody>
    </Layout>
  );
}
