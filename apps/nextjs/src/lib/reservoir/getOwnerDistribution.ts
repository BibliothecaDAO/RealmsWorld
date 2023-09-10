
export const getOwnersDistribution = async ({ collection }: { collection: string }) => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESERVOIR_API}/collections/${collection}/owners-distribution/v1`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.RESERVOIR_API_KEY || '',
                'Access-Control-Allow-Origin': '*'
            },
            next: { revalidate: 1000 }
        });
        const data: any = await res.json()
        return data
    } catch (error) {
        return error
    }
}