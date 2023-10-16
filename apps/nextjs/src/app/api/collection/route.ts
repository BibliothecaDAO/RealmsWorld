import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { formatQueryString } from "@/utils/utils";

export async function POST(request: NextRequest) {
  const query: any = await request.json();

  let queryParams;

  if (query.contracts) {
    queryParams = formatQueryString(query.contracts);
  } else {
    queryParams = new URLSearchParams(query);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESERVOIR_API}/collections/v5?${queryParams}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.RESERVOIR_API_KEY || "",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
    return res.json();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
