import { getData } from "@/functions";
import { stringify } from "querystring";

export default async function Page({
  params,
}: {
  params: { address: string; id: string };
}) {
  const data = await getData(
    stringify({ tokens: params.address + ":" + params.id }),
    "token"
  );

  const query: any = await data.json();

  console.log(query);

  return <h1>Token</h1>;
}
