import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import UserClaims from "../claim.json";
import CumulativePaymentTree from "../cumulative-payment-tree";

const UserClaim = UserClaims.map((claim) => ({
  ...claim,
  amount: claim.amount + "0".repeat(18),
  originalAmount: claim.amount,
}));

export async function GET(request: NextRequest, props: { params: Promise<{ address: string }> }) {
  const params = await props.params;
  //const query: any = await request.json();

  try {
    const claim = UserClaim.find(
      (claim) => claim.payee == params.address.toLowerCase(),
    );

    if (claim) {
      const paymentTree = new CumulativePaymentTree(UserClaim);
      const proof = paymentTree.hexProofForPayee(
        params.address.toLowerCase(),
        10,
      );
      const claimAm = claim.originalAmount;

      return NextResponse.json({
        proof,
        amount: claimAm,
      });
    } else {
      return NextResponse.json({ data: null, amount: null});
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
