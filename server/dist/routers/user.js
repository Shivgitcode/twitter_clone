import { t } from "../trpc.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
export const secret = "thisistopsecret";
const userProcedure = t.procedure.input(z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
}));
const loginProcedure = t.procedure.input(z.object({
    username: z.string(),
    password: z.string(),
}));
const userRouter = t.router({
    register: userProcedure.mutation(async ({ input }) => {
        const { password } = input;
        const hashPass = await bcrypt.hash(password, 12);
        const createUser = await prisma.user.create({
            data: {
                ...input,
                password: hashPass,
            },
        });
        return {
            message: "user created",
            data: createUser,
        };
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
            return res.status(200).json({
                message: "user not found",
            });
        }
        const { password: hashPass } = foundUser;
        const isUser = await bcrypt.compare(password, hashPass);
        if (isUser) {
            const token = jwt.sign({ id: foundUser.id }, secret);
            res.cookie("jwt", token);
            return {
                token: token,
            };
        }
        else {
            return {
                message: "Invalid username or password",
            };
        }
    }),
});
export { userRouter };
