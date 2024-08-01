import type { ISiwsDomain, ISiwsMessage } from "siws";
import { NETWORK_NAME } from "@/constants/env";
import { getCsrfToken } from "next-auth/react";
import { SiwsTypedData } from "siws";

export async function createSiwsData(statement: string, address: string) {
  const domain = window.location.host;
  const origin = window.location.origin;
  /*const res = await fetch(`/api/auth/nonce`, {
    credentials: "include",
  });
  console.log(res);
  const responseNonce = (await res.json()) as { nonce: string };
  console.log(responseNonce);*/
  const siwsDomain: ISiwsDomain = {
    version: "0.0.1",
    chainId: `SN_${NETWORK_NAME}`,
    name: domain,
    revision: "1",
  };
  const siwsMessage: ISiwsMessage = {
    address,
    statement,
    uri: origin,
    version: "0.0.5", //message version and not the starknetdomain version
    nonce: await getCsrfToken(),
    issuedAt: new Date().toISOString(),
  };

  const signindata = new SiwsTypedData(siwsDomain, siwsMessage);
  return signindata;
}
