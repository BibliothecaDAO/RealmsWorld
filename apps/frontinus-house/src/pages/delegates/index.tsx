import { Layout, LayoutBody } from "@/components/layout";
import { useSpace } from "@/components/space-provider";

export default function Delegates() {
    const{space} = useSpace()
  return (
    <Layout>
      <LayoutBody className="flex flex-col" fixedHeight>
        <h1>Delegates</h1>
        {space?.name}
      </LayoutBody>
    </Layout>
  );
}
