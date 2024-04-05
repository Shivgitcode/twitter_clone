import { JwtPayload } from "jsonwebtoken";
import { t } from "../trpc.js";
import { prisma, secret, userRouter } from "./user.js";
import { jwt } from "./user.js";


const postRouters=t.router({
    getPosts:t.procedure.query(async({ctx})=>{
        const {req,res}=ctx
        const token=req.cookies.jwt
        const verifyToken=jwt.verify(token,secret)
        const {id}=verifyToken as JwtPayload
        const getPosts=await prisma.post.findMany({
            where:{
                userId:id
            }
        })
        return{
            getPosts

        }

    })
})


export const mergedRouters=t.mergeRouters(postRouters,userRouter)

export type AppRouter=typeof mergedRouters

