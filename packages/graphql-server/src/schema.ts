import { GarphSchema } from "garph";

export const g = new GarphSchema();

const stringMetadataAttributesType = g.type("StringMetadataAttributes", {
  trait_type: g.string(),
  value: g.string(),
});
const numberMetadataAttributesType = g.type("NumberMetadataAttributes", {
  trait_type: g.string(),
  value: g.int(),
});
const metadataAttributesType = g.unionType("MetadataAttributes", {
  stringMetadataAttributesType,
  numberMetadataAttributesType,
});
const metadataType = g.type("Metadata", {
  attributes: g.ref(metadataAttributesType).list().optional(),
});

export const ERC721TranfersGQL = g.type("ERC721Transfers", {
  _cursor: g.int().optional(),
  id: g.string(),
  token_id: g.int().optional(),
  contract_address: g.string().optional(),
  token_key: g.string().optional(),
  fromAddress: g.string().optional(),
  toAddress: g.string().optional(),
});

export const ERC721TokensGQL = g.type("ERC721Tokens", {
  _cursor: g.int().optional(),
  id: g.string(),
  token_id: g.int().optional(),
  contract_address: g.string().optional(),
  minter: g.string().optional(),
  owner: g.string().optional(),
  image: g.string().optional(),
  name: g.id().optional(),
  metadata: g.ref(metadataType).optional(),
  transfers: g.ref(ERC721TranfersGQL).list().optional(),
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
