// utils/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/routers/user";

export const trpc = createTRPCReact<AppRouter>();
// => { useQuery: ..., useMutation: ...}
