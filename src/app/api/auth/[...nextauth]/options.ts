import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { use } from "react";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            // for future proofing in case user wants to find either using email or username
                            { username: credentials.identifier } // no need in current system
                        ]
                    })

                    if (!user) {
                        throw new Error("No user found with this email")
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
            }
        })


    ]
}