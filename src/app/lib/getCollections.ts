import { formatQueryString } from "@/functions/utils";

export const getCollections = async (contracts: Array<{ contract: string }>) => {

    let queryParams;

    if (contracts) {
        queryParams = formatQueryString(contracts);
    } else {
    }


    try {
        const res = await fetch(`https://api.reservoir.tools/collections/v5?${queryParams}`, {
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