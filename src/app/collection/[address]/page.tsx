import { getData } from "@/functions";

export default async function Page({
    params
  }: {
    params: { address: string };
  }) {

    const data = await getData({id: params.address}, 'collection');

    
    const query: any = await data.json()

    
    console.log(query)

    return <h1>My Page</h1>;
  }
  