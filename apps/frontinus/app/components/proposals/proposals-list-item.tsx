import { Proposal } from "app/gql/graphql"
import { getProposalId, shorten } from "app/utils/helpers"
import { Link } from "@tanstack/react-router"
import ProposalsVote from "./proposal-vote"

export const ProposalsListItem = ({ proposal }: { proposal: Proposal }) => {
    return (<Link to={`/proposals/${proposal.proposal_id}`}>
        <div className="flex border-b py-[14px] font-sans">
            <div className="mr-4 w-0 flex-auto">
                <div className="flex space-x-2">
                    <div className="my-1 items-center leading-6 md:flex md:min-w-0">
                        <h4 className="my-0 text-xl tracking-wider font-sans-serif">
                            {proposal.metadata?.title ?? `Proposal #${proposal.id}`}
                        </h4>
                    </div>
                </div>
                <div className="mr-4 inline text-muted">
                    {getProposalId(proposal)} by{" "}
                    {shorten(proposal.author.id)}
                </div>
                <span>{proposal.vote_count} voters  - {proposal.scores_total} Realms</span>
            </div>
            <ProposalsVote proposal={proposal} />
        </div>
    </Link>)
}
