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

export const getToken = async ({ collection, query }: { collection?: string, query: any }) => {

    if (collection) query.collection = collection
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESERVOIR_API}/tokens/v6?${queryString}&${check()}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.RESERVOIR_API_KEY || '',
            },
            next: { revalidate: 60 }
        });
        const data: any = await res.json()
        return data
    } catch (error) {
        return error
    }
}