import 'server-only';

import { reservoirLootCollectionSetId } from "@/constants/whiteListedContracts";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const query: any = await request.json()

  try {
    const queryString = query.continuation ? `&continuation=${query.continuation}` : "";

    const url = `https://api.reservoir.tools/users/${query.address}/tokens/v7?collectionsSetId=${reservoirLootCollectionSetId}&${queryString}&limit=24`;
    console.log(url)
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.RESERVOIR_API_KEY || '',
        'Access-Control-Allow-Origin': '*'
      },
    })

    const data: any = await res.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' })
  }
}