import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const query: any = await request.json()

  console.log('https://api.reservoir.tools/users/${query.address}/tokens/v6')
  try {
    const res = await fetch(`https://api.reservoir.tools/users/${query.address}/tokens/v6`, {
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