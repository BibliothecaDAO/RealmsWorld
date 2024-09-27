import { Proposal, Space, User, Vote, NetworkID, NetworkConstants, ProposalsFilter, SpacesFilter, PaginationOpts } from 'app/types';
import { METADATA } from '..';
import { ChainId } from '@realms-world/constants';
import request from 'graphql-request'

const apiUrl = METADATA["sn"]?.apiUrl ?? "";
const spaceId = "0x07bd3419669f9f0cc8f19e9e2457089cdd4804a4c41a5729ee9c7fd02ab8ab62"
import {
    LEADERBOARD_QUERY,
    PROPOSAL_QUERY,
    PROPOSALS_QUERY,
    SPACE_QUERY,
    SPACES_QUERY,
    USER_QUERY,
    USER_VOTES_QUERY,
    VOTES_QUERY
} from '../queries';
import { clone } from '../../utils/helpers';

export const fetchProposals = (
    //spaceIds: string[],
    { limit, skip = 0 }: PaginationOpts,
    current: number,
    filters?: ProposalsFilter,
    searchQuery = ''
) => {
    const _filters: Record<string, any> = clone(filters || {});
    const state = _filters.state;

    if (state === 'active') {
        _filters.start_lte = current;
        _filters.max_end_gte = current;
    } else if (state === 'pending') {
        _filters.start_gt = current;
    } else if (state === 'closed') {
        _filters.max_end_lt = current;
    }

    return request(
        apiUrl,
        PROPOSALS_QUERY,
        {
            first: limit,
            skip,
            where: {
                space_in: [spaceId],
                cancelled: false,
                metadata_: { title_contains_nocase: searchQuery },
                ..._filters
            }
        }
    )
};

export const fetchProposal = async (
    spaceId: string,
    proposalId: number,
    current: number
): Promise<Proposal | null> => {
    const response = await fetch(`${apiUrl}/proposals/${spaceId}/${proposalId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch proposal');
    }

    const data = await response.json();
    return data.proposal;
};

export const fetchSpaces = async (
    pagination: PaginationOpts,
    filter?: SpacesFilter
): Promise<Space[]> => {
    const response = await fetch(`${apiUrl}/spaces`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pagination, filter })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch spaces');
    }

    const data = await response.json();
    return data.spaces;
};

export const fetchSpace = async (id: string): Promise<Space | null> => {
    const response = await fetch(`${apiUrl}/spaces/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch space');
    }

    const data = await response.json();
    return data.space;
};

export const fetchUser = async (id: string): Promise<User | null> => {
    const response = await fetch(`${apiUrl}/users/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    const data = await response.json();
    return data.user;
};

export const fetchUserVotes = async (
    voter: string,
    { limit, skip = 0 }: PaginationOpts,
) => {

    return request(
        apiUrl,
        USER_VOTES_QUERY,
        {
            voter,
            first: limit,
            skip,
        }
    )
};
