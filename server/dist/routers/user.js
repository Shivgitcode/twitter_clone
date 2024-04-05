import { t } from "../trpc.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";
export const prisma = new PrismaClient();
export const secret = "thisistopsecret";
export const jwt = jsonwebtoken;
const userProcedure = t.procedure.input(z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    imgFiles: z.any()
}));
const loginProcedure = t.procedure.input(z.object({
    username: z.string(),
    password: z.string(),
}));
const userRouter = t.router({
    register: userProcedure.mutation(async ({ input, ctx }) => {
        const { req, res } = ctx;
        const { password } = input;
        const file = req.files?.imgfiles;
        console.log(file);
        return {
            message: "done"
        };
        // const hashPass = await bcrypt.hash(password, 12);
        // const createUser = await prisma.user.create({
        //   data: {
        //     ...input,
        //     password: hashPass,
        //   },
        // });
        // return {
        //   message: "user created",
        //   data: createUser,
        // };
    }),
    getUsers: t.procedure.query(async () => {
        const allUsers = await prisma.user.findMany({});
        return {
            message: "all Users",
            data: allUsers,
        };
    }),
    login: loginProcedure.mutation(async ({ ctx, input }) => {
        const { req, res } = ctx;
        const { username, password } = input;
        const foundUser = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!foundUser) {
            return {
                message: "user not found"
            };
        }
        const { password: hashPass } = foundUser;
        const isUser = await bcrypt.compare(password, hashPass);
        if (isUser) {
            const token = jwt.sign({ id: foundUser.id }, secret);
            res.cookie("jwt", token);
            return {
                message: "isLogged In",
                token
            };
        }
        else {
            return {
                message: "Invalid username or password",
            };
        }
    }),
    logout: t.procedure.mutation(async ({ ctx }) => {
        const { req, res } = ctx;
        res.cookie("jwt", "", {
            maxAge: 5
        });
        return {
            message: "logged Out successfully"
        };
    }),
    getUser: t.procedure.query(async ({ ctx }) => {
        const { req, res } = ctx;
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, secret);
        const { id } = verifyToken;
        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });
        return {
            user
        };
    })
});
// export type AppRouter = typeof userRouter;
export { userRouter };
