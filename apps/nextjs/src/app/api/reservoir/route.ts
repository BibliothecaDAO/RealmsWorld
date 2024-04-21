import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getUser } from "@/lib/reservoir/getUser";


export function GET(
  request: NextRequest,
  { params }: { params: { address: string } },
) {
  //const query: any = await request.json();
    try{
    const data = getUser({address: params.address})
    return data
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
