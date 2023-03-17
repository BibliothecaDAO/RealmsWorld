export async function getData(query: any, route: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_API + route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res;
} 