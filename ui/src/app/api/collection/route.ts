import { formatQueryString } from "@/functions/utils";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const query: any = await request.json()

  let queryParams;

  if (query.contracts) {
    queryParams = formatQueryString(query.contracts);
  } else {
    queryParams = new URLSearchParams(query);
  }


  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_RESERVOIR_API}/collections/v5?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.RESERVOIR_API_KEY || '',
        'Access-Control-Allow-Origin': '*'
      },
    });
    const data: any = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal server error' })
  }
}