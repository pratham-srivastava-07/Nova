
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "Email", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            // const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    email: credentials.email
                }
            });

            if (existingUser) {
                const passwordValidation = await db.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                })
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.email
                    }
                }
                return null;
            }

            return null
          },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
              token.id = user.id;
            }
            return token;
          },
          async session({ session, token }: any) {
            session.user = {
              id: token.id,
              ...session.user,
            };
            return session;
          },
    },
    pages: {
        signIn: "/signin"
    }
  }
  