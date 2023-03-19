import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const query: any = await request.json()
  const queryParams =  new URLSearchParams(query);

    try {
      const res = await fetch(`https://api.reservoir.tools/collections/v5?${queryParams}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.RESERVOIR_API_KEY || '',
          'Access-Control-Allow-Origin': '*'
        },
      });
      const data: any = await res.json()

      console.log(data)
      return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json({ message: 'Internal server error' })
    }
}