/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { ToBufferInputTypes } from "ethereumjs-util";
import {
  bufferToHex,
  keccak256,
  setLengthLeft,
  toBuffer,
} from "ethereumjs-util";
import Web3Utils from "web3-utils";

export default class MerkleTree {
  layers: any;
  elements: Buffer[];
  constructor(elements: any[]) {
    // Filter empty strings and hash elements
    this.elements = elements
      .filter((el: any) => el)
      .map((el: any) => this.sha3(el));

    // Deduplicate elements
    this.elements = this.bufDedup(this.elements);
    // Sort elements
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.elements.sort(Buffer.compare);

    // Create layers
    this.layers = this.getLayers(this.elements);
  }

  getLayers(elements: string | any[]) {
    if (elements.length === 0) {
      return [[""]];
    }

    const layers = [];
    layers.push(elements);

    // Get next layer until we reach the root
    //@ts-expect-error works
    while (layers[layers.length - 1].length > 1) {
      //@ts-expect-error works
      layers.push(this.getNextLayer(layers[layers.length - 1]));
    }

    return layers;
  }
  getNextLayer(elements: any[]) {
    return elements.reduce(
      (layer: any[], el: any, idx: number, arr: Record<string, any>) => {
        if (idx % 2 === 0) {
          // Hash the current element with its pair element
          layer.push(this.combinedHash(el, arr[idx + 1]));
        }

        return layer;
      },
      [],
    );
  }

  combinedHash(first: any, second: any) {
    if (!first) {
      return second;
    }
    if (!second) {
      return first;
    }
    return keccak256(this.sortAndConcat(first, second)); // Identical to: Buffer.from(hexToBytes(soliditySha3({t: 'bytes', v: this.sortAndConcat(first,second).toString("hex")})))
  }

  getRoot() {
    return this.layers[this.layers.length - 1][0];
  }

  getHexRoot() {
    return bufferToHex(this.getRoot());
  }

  getProof(el: any, prefix: any[]) {
    let idx = this.bufIndexOf(el, this.elements);

    if (idx === -1) {
      throw new Error("Element does not exist in Merkle tree");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    let proof = this.layers.reduce((proof: any[], layer: any) => {
      const pairElement = this.getPairElement(idx, layer);

      if (pairElement) {
        proof.push(pairElement);
      }

      idx = Math.floor(idx / 2);

      return proof;
    }, []);

    if (prefix) {
      if (!Array.isArray(prefix)) {
        prefix = [prefix];
      }

      prefix = prefix.map((item: ToBufferInputTypes) =>
        setLengthLeft(toBuffer(item), 32),
      );
      proof = prefix.concat(proof);
    }

    return proof;
  }

  getHexProof(
    el: {
      payee: string;
      // Hash the current element with its pair element
      amount: number;
    },
    prefix: (string | number)[],
  ) {
    const proof = this.getProof(el, prefix);

    return this.bufArrToHex(proof);
  }

  getPairElement(idx: number, layer: string | any[]) {
    const pairIdx = idx % 2 === 0 ? idx + 1 : idx - 1;

    if (pairIdx < layer.length) {
      return layer[pairIdx];
    } else {
      return null;
    }
  }

  bufIndexOf(el: any, arr: string | any[]) {
    let hash;

    // Convert element to 32 byte hash if it is not one already
    if (el.length !== 32 || !Buffer.isBuffer(el)) {
      hash = this.sha3(el);
    } else {
      hash = el;
    }

    for (let i = 0; i < arr.length; i++) {
      if (hash.equals(arr[i])) {
        return i;
      }
    }

    return -1;
  }

  bufDedup(elements: any[]) {
    return elements.filter((el: any, idx: number) => {
      return this.bufIndexOf(el, elements) === idx;
    });
  }

  bufArrToHex(arr: any[]) {
    if (arr.some((el: any) => !Buffer.isBuffer(el))) {
      throw new Error("Array is not an array of buffers");
    }

    return (
      "0x" +
      arr
        .map((el: { toString: (arg0: string) => any }) => el.toString("hex"))
        .join("")
    );
  }

  sortAndConcat(...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return Buffer.concat([...args].sort(Buffer.compare));
  }

  sha3(node: { payee: string; amount: number }) {
    return Buffer.from(
      Web3Utils.hexToBytes(
        Web3Utils.soliditySha3(
          { t: "address", v: node.payee },
          { t: "uint256", v: node.amount },
        )!,
      ),
    );
  }
}
