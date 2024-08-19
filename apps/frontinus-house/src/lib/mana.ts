export const MANA_URL =
  import.meta.env.VITE_MANA_URL as string || "http://localhost:3000";


interface RpcResponse<T> { id: number; jsonrpc: "2.0"; result: T; error: string }
async function rpcCall<Req, Res>(path: string, method: string, params: Req): Promise<Res> {
  const res = await fetch(`${MANA_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method,
      params,
      id: null,
    }),
  });

  const { error, result } = await res.json() as RpcResponse<Res>;
  if (error) throw new Error("RPC call failed");

  return result;
}

export async function registerTransaction(
  chainId: number | string,
  params: {
    type: string;
    hash: string;
    // TODO: set proper type
    // eslint-disable-next-line
    payload: any;
  },
) {
  return rpcCall(`stark_rpc/${chainId}`, "registerTransaction", params);
}

export async function executionCall(
  network: "eth" | "stark",
  chainId: number | string,
  method: "finalizeProposal" | "execute" | "executeQueuedProposal",
  params: string[],
) {
  return rpcCall(`${network}_rpc/${chainId}`, method, params);
}
