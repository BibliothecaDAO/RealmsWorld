import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Web3Utils from "web3-utils";

import UserClaim from "../claim.json";
import CumulativePaymentTree from "../cumulative-payment-tree";

export async function GET(request: NextRequest, { params }: { params: any }) {
  //const query: any = await request.json();

  try {
    /*const formatClaim = UserClaim.map((a: any) => {
      const toEth = Web3Utils.toWei(a.amount.toString()).toString();
      return {
        payee: a.payee,
        amount: Web3Utils.toBN(toEth),
      };
    });*/
    const claim = UserClaim.find(
      (claim) => claim.payee == params.address.toLowerCase(),
    );

    if (claim) {
      const paymentTree = new CumulativePaymentTree(UserClaim);
      const proof = paymentTree.hexProofForPayee(
        params.address.toLowerCase(),
        10,
      );
      const claimAm = claim.amount;

      return NextResponse.json({
        proof,
        amount: claimAm,
      });
    } else {
      return NextResponse.json({ message: "Claim not found for account" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
