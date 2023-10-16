import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const query: any = await request.json();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESERVOIR_API}/tokens/${query.token}/activity/v4`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.RESERVOIR_API_KEY || "",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
    const data: any = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" });
  }
}
