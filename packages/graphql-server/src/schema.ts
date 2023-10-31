import { GarphSchema } from "garph";

export const g = new GarphSchema();

const metadataAttributesType = g.type("MetadataAttributes", {
  trait_type: g.string(),
  value: g.string(),
});
const metadataType = g.type("Metadata", {
  attributes: g.ref(metadataAttributesType).list().optional(),
});
export const ERC721TokensGQL = g.type("ERC721Tokens", {
  _cursor: g.int().optional(),
  id: g.string(),
  token_id: g.int().optional(),
  contract_address: g.string().optional(),
  owner: g.string().optional(),
  image: g.string().optional(),
  name: g.id().optional(),
  metadata: g.ref(metadataType).optional(),
});

export const queryType = g.type("Query", {
  getERC721Tokens: g
    .ref(ERC721TokensGQL)
    .list()
    .args({
      contract_address: g.string().optional(),
      limit: g.int().default(20),
      cursor: g.int().default(0),
      owner: g.string().optional(),
    })
    .description("Gets an a list of ERC721 Tokens"),
});
