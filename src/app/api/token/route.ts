import { NextResponse, NextRequest } from "next/server";

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

export async function POST(request: any) {
  const query: any = await request.json()
  const queryString = buildQueryString(query);
  
    try {
      const res = await fetch(`https://api.reservoir.tools/tokens/v5?${queryString}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.RESERVOIR_API_KEY || '',
        },
      });
      const data: any = await res.json()
      return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json({ message: 'Internal server error' })
    }
}