import { NextResponse } from "next/server";

export async function POST(request: any) {
  const query: any = await request.json()
  const queryParams =  new URLSearchParams(query);

  console.log(`https://api.reservoir.tools/tokens/v5?${queryParams}`)

    try {
      const res = await fetch(`https://api.reservoir.tools/tokens/v5?${queryParams}`, {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
          'x-api-key': process.env.RESERVOIR_API_KEY || '',
        },
      });
      const data: any = await res.json()
      return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json({ message: 'Internal server error' })
    }
}