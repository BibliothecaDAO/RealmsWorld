import { BuyButton } from "@/app/components/BuyModal";
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

  // const query: any = await data.json();

  return (
    <div>
      <BuyButton address={params.address}  id={params.id} />
    </div>
  );
}
