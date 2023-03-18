import { NextResponse } from "next/server";

export async function POST(request: any) {
  const query: any = await request.json()

  console.log(query)
  const queryParams =  new URLSearchParams(query);

  const collection = query.collection;

  console.log(`https://api.reservoir.tools/collections/${query.collection}/attributes/all/v3`)

    try {
      const res = await fetch(`https://api.reservoir.tools/collections/${query.collection}/attributes/all/v3`, {
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