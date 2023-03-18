import { getData } from "@/functions";
import Link from "next/link";
import { Table } from "./table";
import { Attributes } from "./attributes";

export default async function Page({
  params,
}: {
  params: { address: string };
}) {
  console.log(params)
  const data = await getData({ id: params.address }, "collection");
  const response: any = await data.json();

  const collection_name = response.collections[0].name;

  const attributes = await getData({ collection: params.address }, "attributes");
  const attributes_response: any = await attributes.json();

  return (
    <div className="p-8">
      <h1>{collection_name}</h1>{" "}
      <Attributes address={params.address} attributes={attributes_response}/>
      <Table address={params.address} collection={response.collections[0]}/>
    </div>
  );
}
