import { getData } from "@/functions";

export default async function Page({
  params,
}: {
  params: { address: string; id: string };
}) {
  const data = await getData(
    { tokens: params.address + ":" + params.id },
    "token"
  );

  const query: any = await data.json();

  const token = query.tokens[0].token;

  return <h1>{token.name}</h1>;
}
