import express from "express"
import z from "zod"
import { client } from "../db";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";

export const userRouter = express.Router();

const signupBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

userRouter.post("/signup", async(req, res) => {
    const parsedBody = signupBody.safeParse(req.body)

    if(!parsedBody.success) {
        return res.status(403).json({message: "Invalid Inputs"});
    }

    const existingUser = await client.user.findFirst({
        where: {
            email: req.body.email
        }
    })

    if(existingUser) {
        return res.status(411).json({message: "User already exists"});
    }

    const newUser = await client.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    })
    
    const userId = newUser.id

    const token = jwt.sign({
        userId: userId
    }, JWT_SECRET)

    return res.status(200).json({message: "User Created"});
})

const signinBody = z.object({
    email: z.string().email(),
    password: z.string()
})

userRouter.post("/signin", async (req, res) => {
    const parsedBody = signinBody.safeParse(req.body);

    if(!parsedBody.success) {
        return res.status(403).json({message: "Invalid inputs"});
    }

    const existingUser = await client.user.findFirst({
        where: {
            email: req.body.email
        }
    })

    if(!existingUser) {
        return res.status(404).json({
            message: "user not found! Please signup first"
        })
    }

    const token = jwt.sign({
        id: existingUser.id,
    }, JWT_SECRET)

    res.status(200).json({message: "User logged in", token: token})
})