import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { userRouter } from "./routers/user.js";
import { createContext } from "./context.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);

app.use(
  "/trpc",
  createExpressMiddleware({ router: userRouter, createContext })
);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
