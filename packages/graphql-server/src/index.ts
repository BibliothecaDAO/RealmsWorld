import { buildSchema } from "garph";

import { resolvers } from "./resolvers";
import { g } from "./schema";

export const schema = buildSchema({ g, resolvers });
