import * as auth from "./auth";
import * as bridge from "./bridge";
import * as delegates from "./delegates";
import * as erc721AttributeKeys from "./erc721_attribute_keys";
import * as erc721Attributes from "./erc721_attributes";
import * as erc721Bridge from "./erc721_bridge";
import * as erc721Collections from "./erc721_collections";
import * as erc721MarketEvents from "./erc721_market_events";
import * as erc721TokenAttributes from "./erc721_token_attributes";
import * as erc721Tokens from "./erc721_tokens";
import * as lordsRewards from "./lords_rewards";
import * as velordsBurns from "./velords_burns";

export * from "./auth";
export * from "./bridge";
export * from "./erc721_attribute_keys";
export * from "./erc721_attributes";
export * from "./erc721_collections";
export * from "./erc721_market_events";
export * from "./erc721_token_attributes";
export * from "./erc721_tokens";
export * from "./delegates";
export * from "./erc721_bridge";
export * from "./lords_rewards";
export * from "./velords_burns";

export const schema = {
  ...auth,
  ...bridge,
  ...delegates,
  ...erc721Attributes,
  ...erc721AttributeKeys,
  ...erc721Bridge,
  ...erc721Collections,
  ...erc721MarketEvents,
  ...erc721Tokens,
  ...erc721TokenAttributes,
  ...lordsRewards,
  ...velordsBurns,
};
