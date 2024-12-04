
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
interface User {
    id: string;
    name: string | null;
    email: string;
    // Add other fields from your user model as needed
  }
export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "Email", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials) {
            if (!credentials || typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
                return null;
              }
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
        async jwt({ token, user }: { token: JWT, user?: User }) {
            if (user) {
              token.id = user.id;
              token.email = user.email
            }
            return token;
          },
          async session({ session }: { session: Session, token: JWT }) {
            session.user = {
              ...session.user,
            };
            return session;
          },
    },
    pages: {
        signIn: "/signin"
    }
  }
  