import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@realms-world/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@realms-world/api";
