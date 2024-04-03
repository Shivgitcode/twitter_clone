import { initTRPC } from "@trpc/server";
import { createContext } from "./context.js";

type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

export { t };
