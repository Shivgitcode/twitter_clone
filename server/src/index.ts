import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { userRouter } from "./routers/user.js";
import { createContext } from "./context.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  "/trpc",
  createExpressMiddleware({ router: userRouter, createContext })
);

// export type AppRouter = typeof userRouter;

app.listen(3000, () => {
  console.log("server running on port 3000");
});