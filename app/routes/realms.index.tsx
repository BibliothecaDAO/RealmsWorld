import { Card } from '@/components/ui/card'
import { marketPlaceClientBuilder } from '@/lib/ark/client'
import { realmsQueryOptions } from '@/queryOptions/realmsQueryOptions'
import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, ErrorComponent, ErrorComponentProps, useRouter } from '@tanstack/react-router'
import React from 'react'

export class RealmsNotFoundError extends Error {}

export const Route = createFileRoute('/realms/')({
        loader: ({ context: { queryClient, arkClient }, params: {  } }) => {
          return queryClient.ensureQueryData(realmsQueryOptions({walletAddress: "0x037c6B561b367a85b68668e8663041b9E2F4199c346FBda97dc0c2167F7A6016", client: arkClient}))
        },
        errorComponent: PostErrorComponent,
        component: RealmsComponent,

})
export function PostErrorComponent({ error }: ErrorComponentProps) {
    const router = useRouter()
    if (error instanceof RealmsNotFoundError) {
      return <div>{error.message}</div>
    }
    const queryErrorResetBoundary = useQueryErrorResetBoundary()
  
    React.useEffect(() => {
      queryErrorResetBoundary.reset()
    }, [queryErrorResetBoundary])
  
    return (
      <div>
        <button
          onClick={() => {
            router.invalidate()
          }}
        >
          retry
        </button>
        <ErrorComponent error={error} />
      </div>
    )
  }
function RealmsComponent() {
    //const postId = Route.useParams().postId
    const arkClient = marketPlaceClientBuilder(window.fetch.bind(window));

    const { data: realms } = useSuspenseQuery(realmsQueryOptions({walletAddress: "0x037c6B561b367a85b68668e8663041b9E2F4199c346FBda97dc0c2167F7A6016", client: arkClient}))
  return <div className='grid grid-cols-2 sm:grid-cols-5 gap-2 p-4'>
    {realms.data.map((realm) => {
        return <Card className='overflow-hidden'><img src={realm.metadata?.image} /></Card>
    })}
  </div>
}
