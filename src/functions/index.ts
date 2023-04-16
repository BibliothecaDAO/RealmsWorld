export async function getData(query: any, route: string, forceRefresh?: boolean) {
    const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_API + route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        cache: forceRefresh ? "no-cache" : "default",
        body: JSON.stringify(query)
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return await res.json();;
}