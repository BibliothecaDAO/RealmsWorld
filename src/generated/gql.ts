/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query getEconomyTotalValues @api(name: starkIndexer) {\n  economySettledRealmsTotal\n  economyExchangeLordsPurchasedTotal\n}": types.GetEconomyTotalValuesDocument,
    "query getHistoricPriceData($dateFrom: String!, $dateTo: String!, $tokenId: Int!) @api(name: starkIndexer) {\n  exchangeRates(\n    where: {date: {gt: $dateFrom, lte: $dateTo}, tokenId: {equals: $tokenId}}\n    orderBy: {date: asc}\n  ) {\n    date\n    hour\n    tokenId\n    amount\n    buyAmount\n    sellAmount\n  }\n}": types.GetHistoricPriceDataDocument,
    "query getEconomyLpResourceTotals @api(name: starkIndexer) {\n  economyLpResourceMintedTotals {\n    resourceId\n    resourceName\n    amount\n  }\n  economyLpResourceBurnedTotals {\n    resourceId\n    resourceName\n    amount\n  }\n}": types.GetEconomyLpResourceTotalsDocument,
    "query getEconomyResourceTotals @api(name: starkIndexer) {\n  economyResourceMintedTotals {\n    resourceId\n    resourceName\n    amount\n  }\n  economyResourceBurnedTotals {\n    resourceId\n    resourceName\n    amount\n  }\n}": types.GetEconomyResourceTotalsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getEconomyTotalValues @api(name: starkIndexer) {\n  economySettledRealmsTotal\n  economyExchangeLordsPurchasedTotal\n}"): (typeof documents)["query getEconomyTotalValues @api(name: starkIndexer) {\n  economySettledRealmsTotal\n  economyExchangeLordsPurchasedTotal\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getHistoricPriceData($dateFrom: String!, $dateTo: String!, $tokenId: Int!) @api(name: starkIndexer) {\n  exchangeRates(\n    where: {date: {gt: $dateFrom, lte: $dateTo}, tokenId: {equals: $tokenId}}\n    orderBy: {date: asc}\n  ) {\n    date\n    hour\n    tokenId\n    amount\n    buyAmount\n    sellAmount\n  }\n}"): (typeof documents)["query getHistoricPriceData($dateFrom: String!, $dateTo: String!, $tokenId: Int!) @api(name: starkIndexer) {\n  exchangeRates(\n    where: {date: {gt: $dateFrom, lte: $dateTo}, tokenId: {equals: $tokenId}}\n    orderBy: {date: asc}\n  ) {\n    date\n    hour\n    tokenId\n    amount\n    buyAmount\n    sellAmount\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getEconomyLpResourceTotals @api(name: starkIndexer) {\n  economyLpResourceMintedTotals {\n    resourceId\n    resourceName\n    amount\n  }\n  economyLpResourceBurnedTotals {\n    resourceId\n    resourceName\n    amount\n  }\n}"): (typeof documents)["query getEconomyLpResourceTotals @api(name: starkIndexer) {\n  economyLpResourceMintedTotals {\n    resourceId\n    resourceName\n    amount\n  }\n  economyLpResourceBurnedTotals {\n    resourceId\n    resourceName\n    amount\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getEconomyResourceTotals @api(name: starkIndexer) {\n  economyResourceMintedTotals {\n    resourceId\n    resourceName\n    amount\n  }\n  economyResourceBurnedTotals {\n    resourceId\n    resourceName\n    amount\n  }\n}"): (typeof documents)["query getEconomyResourceTotals @api(name: starkIndexer) {\n  economyResourceMintedTotals {\n    resourceId\n    resourceName\n    amount\n  }\n  economyResourceBurnedTotals {\n    resourceId\n    resourceName\n    amount\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;