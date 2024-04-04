import * as trpcExpress from "@trpc/server/adapters/express";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
    res,
  };
};

export { createContext };