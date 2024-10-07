import * as React from 'react'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchProposals } from '@/queries/proposals/proposals'
import { proposalsQueryOptions } from '@/queries/proposals/proposalsQueryOptions'
import { ProposalsList } from '@/components/proposals/proposals-list'

export const Route = createFileRoute('/_layout/proposals')({
  component: ProposalsList,
  // Define the loader function for this route
  loader: async ({ context: { queryClient } }) => {
    const pagination = { limit: 10 }
    const current = 1

    return await queryClient.ensureQueryData(
      proposalsQueryOptions(
        pagination,
        current /*spaceId, networkId as NetworkID*/,
      ),
    )
  },
})
