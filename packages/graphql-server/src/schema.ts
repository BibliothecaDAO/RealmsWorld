import { GarphSchema } from "garph";

export const g = new GarphSchema();

export const ERC721TokensGQL = g.type("ERC721Tokens", {
  _cursor: g.int().optional(),
  id: g.string(),
  token_id: g.int().optional(),
  contract_address: g.string().optional(),
  owner: g.string().optional(),
  image: g.string().optional(),
  name: g.id().optional(),
  //metadata: g.ob
});

export const queryType = g.type("Query", {
  getERC721Tokens: g
    .ref(ERC721TokensGQL)
    .paginatedList()
    .args({ contract_address: g.string() })
    .description("Gets an a list of ERC721 Tokens"),
});

/*export const mutationType = g.type("Mutation", {
  addTodo: g
    .ref(TodoGQL)
    .args({
      title: g.string(),
    })
    .description("Adds a new todo"),
  removeTodo: g
    .ref(TodoGQL)
    .optional()
    .args({
      id: g.int(),
    })
    .description("Removes an existing todo"),
});
*/
