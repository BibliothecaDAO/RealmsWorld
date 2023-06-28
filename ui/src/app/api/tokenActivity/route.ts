import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const query: any = await request.json()
    try {
      const res = await fetch(`https://api.reservoir.tools/tokens/${query.token}/activity/v4`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.RESERVOIR_API_KEY || '',
          'Access-Control-Allow-Origin': '*'
        },
      });
      const data: any = await res.json()
      return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json({ message: 'Internal server error' })
    }
}