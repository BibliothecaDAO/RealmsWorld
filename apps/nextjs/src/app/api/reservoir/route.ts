import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUser } from "@/lib/reservoir/getUser";

export async function GET(request: NextRequest) {
  //const query: any = await request.json();
  const url = new URL(request.url);

  const address = url.searchParams.get("address");

  if (!address) {
    return NextResponse.json({ message: "No address" });
  }
  try {
    const data = await getUser({ address });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
