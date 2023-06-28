import { reservoirLootCollectionSetId } from "@/constants/whiteListedContracts";

export const getUsersActivity = async ({ address }: { address: string }) => {

    try {
        const url = `https://api.reservoir.tools/users/activity/v6?users=${address}&collectionsSetId=${reservoirLootCollectionSetId}`
        console.log(url)
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.RESERVOIR_API_KEY || '',
                'Access-Control-Allow-Origin': '*'
            },
        })
        const data: any = await res.json()
        return data
    } catch (error) {
        return error
    }
}