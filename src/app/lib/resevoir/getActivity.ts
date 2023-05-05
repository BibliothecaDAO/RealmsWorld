import { formatQueryString } from "@/functions/utils";

export const getActivity = async ({ collection, query }: { collection: string, query: any }) => {

    console.log(`https://api.reservoir.tools/collections/activity/v5?collection=${collection}&${formatQueryString(query.types, 'types')}`)
    try {
        const res = await fetch(`https://api.reservoir.tools/collections/activity/v5?collection=${collection}&${formatQueryString(query.types, 'types')}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.RESERVOIR_API_KEY || '',
                'Access-Control-Allow-Origin': '*'
            },
        });
        const data: any = await res.json()
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}