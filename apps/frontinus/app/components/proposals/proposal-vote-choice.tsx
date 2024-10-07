import React from 'react';
import { Lock, Check, X, Minus } from 'lucide-react';
import { Vote } from 'app/types';
import { getChoiceText } from 'app/utils/helpers';
import { Tooltip } from '@realms-world/ui/components/ui/tooltip';
import { Proposal } from 'app/gql/graphql';

interface Props {
    proposal: Proposal;
    vote: Vote;
    showReason?: boolean;
}

const ProposalsVoteChoice: React.FC<Props> = ({ proposal, vote, showReason = true }) => (
    proposal.privacy && !proposal.completed ? (
        <div className="flex gap-1 items-center">
            <span className="text-skin-heading leading-[22px]">Encrypted choice</span>
            <Lock className="w-4 h-4 shrink-0" />
        </div>
    ) : (
        <div className="flex flex-col max-w-full truncate items-start">
            {proposal.type !== 'basic' ? (
                <Tooltip
                    title={getChoiceText(proposal.choices, vote.choice)}
                    className="max-w-full truncate"
                >
                    <h4 className="truncate">
                        {getChoiceText(proposal.choices, vote.choice)}
                    </h4>
                </Tooltip>
            ) : (
                <div className="flex items-center gap-2 truncate">
                    <div
                        className={`shrink-0 rounded-full choice-bg inline-block w-[18px] h-[18px] _${vote.choice}`}
                    >
                        {vote.choice === 1 && (
                            <Check className="text-white w-[14px] h-[14px] mt-0.5 ml-0.5" />
                        )}
                        {vote.choice === 2 && (
                            <X className="text-white w-[14px] h-[14px] mt-0.5 ml-0.5" />
                        )}
                        {vote.choice === 3 && (
                            <Minus className="text-white w-[14px] h-[14px] mt-0.5 ml-0.5" />
                        )}
                    </div>
                    <h4 className="truncate grow">
                        {proposal.choices[(vote.choice as number) - 1]}
                    </h4>
                </div>
            )}
            {showReason && (
                <div className="text-[17px] max-w-full truncate">
                    {vote.reason}
                </div>
            )}
        </div>
    )
);

export default ProposalsVoteChoice;