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

  console.log(query);

  return <h1>Token</h1>;
}
