function buildQueryString(queryObject: any) {
    const queryParams = Object.entries(queryObject)
        .map(([key, value]: any) => {
            if (typeof value === 'object') {
                return Object.entries(value)
                    .map(([subKey, subValue]: any) => `${encodeURIComponent(key)}[${encodeURIComponent(subKey)}]=${encodeURIComponent(subValue)}`)
                    .join('&');
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join('&')
        .replace(/%2B/g, '+');

    console.log(queryParams);

    return `${queryParams}`;
}

function cleanQuery(query: any) {
    const cleanQuery = { ...query };
    delete cleanQuery.sortBy;
    delete cleanQuery.sortDirection;
    delete cleanQuery.collection;
    delete cleanQuery.includeAttributes;
    delete cleanQuery.includeQuantity;
    delete cleanQuery.tokens;
    return cleanQuery;
}

export const getToken = async ({ collection, query }: { collection: string, query: any }) => {

    query.collection = collection
    const queryString = buildQueryString({ attributes: cleanQuery(query) });

    const check = () => {
        const params: any = {}
        if (query.sortBy) {
            params.sortBy = query.sortBy
        } if (query.sortDirection) {
            params.sortDirection = query.sortDirection
        } if (query.includeAttributes) {
            params.includeAttributes = query.includeAttributes
        } if (query.includeQuantity) {
            params.includeQuantity = query.includeQuantity
        } if (query.tokens) {
            params.tokens = query.tokens
        } if (query.collection) {
            params.collection = query.collection
        }
        return new URLSearchParams(params);
    }

    try {
        const res = await fetch(`https://api.reservoir.tools/tokens/v5?${queryString}&${check()}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.RESERVOIR_API_KEY || '',
            },
        });
        const data: any = await res.json()
        return data
    } catch (error) {
        return error
    }
}