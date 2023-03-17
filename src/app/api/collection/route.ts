import { NextResponse } from "next/server";

export const config = {
  runtime: 'edge',
};

export async function POST(request: any) {
  const query: any = await request.json()
  const queryParams =  new URLSearchParams(query);

    try {
      const res = await fetch(`https://api.reservoir.tools/collections/v5?${queryParams}`, {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
          'x-api-key': process.env.NEXT_PUBLIC_RESERVOIR_API_KEY || '',
        },
      });
      const data: any = await res.json()
      return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json({ message: 'Internal server error' })
    }
}