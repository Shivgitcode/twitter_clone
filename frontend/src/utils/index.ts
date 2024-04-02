import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/routers/user";
import { httpBatchLink } from "@trpc/client";

export const trpc = createTRPCReact<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:3000/trpc" })],
});
