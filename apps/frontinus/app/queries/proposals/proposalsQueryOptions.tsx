import { queryOptions } from '@tanstack/react-query'
import { fetchProposals, fetchUserVotes } from './proposals'
import { PaginationOpts } from 'app/types'

export const proposalsQueryOptions = (pagination: PaginationOpts, current: number) =>
    queryOptions({
        queryKey: ['proposals', { pagination, current }],
        queryFn: () => fetchProposals(pagination, current),
    })

export const userVotesQueryOptions = (voter: string, pagination: PaginationOpts) =>
    queryOptions({
        queryKey: ['userVotes', { pagination, voter }],
        queryFn: () => fetchUserVotes(voter, pagination),
    })
