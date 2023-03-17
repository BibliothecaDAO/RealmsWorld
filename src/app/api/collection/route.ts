import { NextResponse } from "next/server";

export async function POST(request: any) {
  const query: any = await request.json()
  const queryParams =  new URLSearchParams(query);

    try {
      const res = await fetch(`https://api.reservoir.tools/collections/v5?${queryParams}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_RESERVOIR_API_KEY || '',
          'Access-Control-Allow-Origin': '*'
        },
      });
      const data: any = await res.json()
      return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json({ message: 'Internal server error' })
    }
}