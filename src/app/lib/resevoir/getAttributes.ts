
export const getAttributes = async ({ collection }: { collection: string }) => {

    try {
        const res = await fetch(`https://api.reservoir.tools/collections/${collection}/attributes/all/v3`, {
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