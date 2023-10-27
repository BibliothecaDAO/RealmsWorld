import { EventSchemas, Inngest } from "inngest";

interface Events {
  "nft/mint": {
    data: {
      contract_address: string;
      tokenId: string;
    };
  };
}
export const inngest = new Inngest({
  id: "ERC721",
  eventKey: "local",
  schemas: new EventSchemas().fromRecord<Events>(),
});
