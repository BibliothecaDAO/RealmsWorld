
export const getOwners = async ({ collection }: { collection: string }) => {

    try {
        const res = await fetch(`https://api.reservoir.tools/owners/v2?contract=${collection}&limit=50`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.RESERVOIR_API_KEY || '',
                'Access-Control-Allow-Origin': '*'
            },
        });
        const data: any = await res.json()
        return data
    } catch (error) {
        return error
    }
}