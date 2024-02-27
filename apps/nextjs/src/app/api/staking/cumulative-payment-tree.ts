/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { bufferToHex, zeros } from "ethereumjs-util";
import _ from "lodash";
import Web3Utils from "web3-utils";

import MerkleTree from "./merkle-tree";

/*
 * `paymentList` is an array of objects that have a property `payee` to hold the
 * payee's Ethereum address and `amount` to hold the cumulative amount of tokens
 * paid to the payee across all payment cycles:
 *
 * [{
 *   payee: "0x627306090abab3a6e1400e9345bc60c78a8bef57",
 *   amount: 20
 * },{
 *   payee: "0xf17f52151ebef6c7334fad080c5704d77216b732",
 *   amount: 12
 * },{
 *   payee: "0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef",
 *   amount: 15
 * }]
 *
 */

export default class CumulativePaymentTree extends MerkleTree {
  paymentNodes: { payee: string; amount: number }[];
  constructor(paymentList: any[]) {
    const filteredPaymentList = paymentList.filter(
      (payment: { payee: any; amount: any }) => payment.payee && payment.amount,
    );
    const groupedPayees = _.groupBy(
      filteredPaymentList,
      (payment) => payment.payee,
    );
    const reducedPaymentList = Object.keys(groupedPayees).map((payee) => {
      const payments = groupedPayees[payee];
      const amount = _.reduce(
        payments,
        (sum, payment) => sum + payment.amount,
        0,
      );
      return { payee, amount };
    });
    super(reducedPaymentList);
    this.paymentNodes = reducedPaymentList;
  }

  amountForPayee(payee: any) {
    const payment = _.find(this.paymentNodes, { payee });
    if (!payment) {
      return 0;
    }

    return Web3Utils.toHex(payment.amount);
  }

  hexProofForPayee(payee: string, paymentCycle: number) {
    const leaf = _.find(this.paymentNodes, { payee });
    if (!leaf) {
      return bufferToHex(zeros(32));
    }
    return this.getHexProof(leaf, [paymentCycle, this.amountForPayee(payee)]);
  }
}
