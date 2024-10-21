import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import UserClaims from "../claim.json";

export async function GET(request: NextRequest, props: { params: Promise<{ address: string }> }) {
  const params = await props.params;
  //const query: any = await request.json();

  try {
    const claimId = UserClaims.findIndex(
      (claim) => claim.payee == params.address.toLowerCase(),
    );

    if (claimId != -1) {
      return NextResponse.json({
        id: claimId + 1,
        amount: UserClaims[claimId]?.amount,
      });
    } else {
      return NextResponse.json({ data: null, amount: null });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
