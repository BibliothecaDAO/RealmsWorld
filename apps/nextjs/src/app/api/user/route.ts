import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { reservoirLootCollectionSetId } from "@/constants/erc721Tokens";

export async function POST(request: NextRequest) {
  const query: any = await request.json();

  try {
    const queryString = query.continuation
      ? `&continuation=${query.continuation}`
      : "";

    const url = `${process.env.NEXT_PUBLIC_RESERVOIR_API}/users/${query.address}/tokens/v7?collectionsSetId=${reservoirLootCollectionSetId}&${queryString}&limit=24`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.RESERVOIR_API_KEY || "",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const data: any = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" });
  }
}
