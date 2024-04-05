// utils/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/routers/post";

export const trpc = createTRPCReact<AppRouter>();
// => { useQuery: ..., useMutation: ...}
