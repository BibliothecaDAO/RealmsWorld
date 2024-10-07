import React, { FC, useMemo } from 'react';
import { _t, getChoiceText, SUPPORTED_VOTING_TYPES } from '@/utils/helpers';
//import { getNetwork, offchainNetworks } from '@/networks';
import { Proposal as ProposalType } from 'app/types';
//import { useMetaStore } from '@/stores/metaStore';
import { useAccount } from '@starknet-react/core';
import { Button } from '@realms-world/ui/components/ui/button';
import { Lock, Pencil } from 'lucide-react'
import { userVotesQueryOptions } from '@/queries/proposals/proposalsQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';

interface ProposalVoteProps {
    proposal: ProposalType;
    editMode?: boolean;
    onEnterEditMode?: () => void;
    children?: React.ReactNode;
}

const ProposalVote: FC<ProposalVoteProps> = ({ proposal, editMode = false, onEnterEditMode, children }) => {
    //const { votes, pendingVotes } = useAccount();
    const { address } = useAccount()
    const { data } = useSuspenseQuery({
        queryKey: ['votes', proposal.id],
        queryFn: () => address ? userVotesQueryOptions(address, { limit: 1000 }) : null,
    });
    const votes = data?.votes || {};

    const start = proposal.start;

    /*const isSupported = useMemo(() => {
        const network = getNetwork(proposal.network);

        const hasSupportedAuthenticator = proposal.space.authenticators.find(
            authenticator => network.helpers.isAuthenticatorSupported(authenticator)
        );
        const hasSupportedStrategies = proposal.strategies.find(strategy =>
            network.helpers.isStrategySupported(strategy)
        );

        return (
            hasSupportedAuthenticator &&
            hasSupportedStrategies &&
            SUPPORTED_VOTING_TYPES.includes(proposal.type)
        );
    }, [proposal]);*/

    const currentVote = useMemo(
        () => votes[`${proposal.network}:${proposal.id}`],
        [votes, proposal]
    );

    const isEditable = useMemo(() => {
        return (
            currentVote &&
            //offchainNetworks.includes(proposal.network) &&
            proposal.state === 'active'
        );
    }, [currentVote, proposal]);

    if (currentVote && !editMode) {
        return (
            <div className="py-2">
                <Button
                    className="!h-[48px] text-left w-full flex items-center rounded-lg space-x-2"
                    disabled={!isEditable}
                    onClick={onEnterEditMode}
                >
                    {proposal.privacy ? (
                        <div
                            className={`flex space-x-2 items-center grow truncate ${!isEditable ? 'text-skin-text' : ''
                                }`}
                        >
                            <Lock className="size-[16px] shrink-0" />
                            <span className="truncate">Encrypted choice</span>
                        </div>
                    ) : (
                        <div
                            className={`grow truncate ${!isEditable ? 'text-skin-text' : ''
                                }`}
                        >
                            {getChoiceText(proposal.choices, currentVote.choice)}
                        </div>
                    )}
                    {isEditable && <Pencil className="shrink-0" />}
                </Button>
            </div>
        );
    } else if (
        !isEditable //&&
        //pendingVotes[proposal.id] //&&
        //!offchainNetworks.includes(proposal.network)
    ) {
        return (
            <div>
                You have already voted for this proposal
            </div>
        );
    } else if (proposal.state === 'pending') {
        return (
            <div>
                Voting for this proposal hasn't started yet. Voting will start {_t(start)}.
            </div>
        );
    } else if (
        ['passed', 'rejected', 'executed'].includes(proposal.state)
    ) {
        return <div>Proposal voting window has ended</div>;
    } else if (proposal.cancelled) {
        return <div>This proposal has been cancelled</div>;
    } /*else if (!isSupported) {
        return <div>Voting for this proposal is not supported</div>;
    }*/ else {
        return <div className="py-2">{children}</div>;
    }
};

export default ProposalVote;

