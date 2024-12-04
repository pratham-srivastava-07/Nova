
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import {z} from "zod"
import { db } from "@/app/lib/db";
import dotenv from "dotenv"

dotenv.config()

const signupBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
})

export async function POST(req: NextRequest) {
    type signUpBodyType = z.infer<typeof signupBody>

    const body: signUpBodyType = await req.json()
    const parsedBody = signupBody.safeParse(body);

    if(!parsedBody.success) {
        return NextResponse.json({message: "Wrong inputs detected"}, {status: 411});
    }

    const existingUser = await db.user.findFirst({
        where: {
            email: body.email
        }
    })

    if(existingUser) return NextResponse.json({message: "User already exists, Please Login"}, {status: 301});

    const newUser = await db.user.create({
        data: {
            name: body.name,
            email: body.email,
            
            password: body.password
        }
    })

    const token = jwt.sign({
        id: newUser.id
    }, process.env.NEXTAUTH_SECRET as string)

    return NextResponse.json({message: "User created", token: token}, {status:201})

} 