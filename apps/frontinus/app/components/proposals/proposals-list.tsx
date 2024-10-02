import { proposalsQueryOptions } from 'app/queries/proposals/proposalsQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query'
import { ProposalsListItem } from './proposals-list-item';

export const ProposalsList = () => {
    const proposalsQuery = useSuspenseQuery(proposalsQueryOptions({ limit: 10 }, 0))

    return (
        <>{!proposalsQuery.data?.proposals ? "No proposals" : (
            <div>
                <h2 className='text-3xl tracking-widest font-sans-serif uppercase'>Proposals</h2>

                {proposalsQuery.data.proposals.map((proposal) =>
                    proposal ? <ProposalsListItem key={proposal.id} proposal={proposal} /> : null
                )}
            </div>
        )}</>)
};
