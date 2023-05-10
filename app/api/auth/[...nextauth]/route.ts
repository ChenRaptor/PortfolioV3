import { connectToDatabase } from '@/libs/mongodb';
//import NextAuth from 'next-auth/next';
//import { GitHubProvider } from 'next-auth/providers/github';
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"

import type { User } from 'next-auth';
// import { connectToDatabase } from "@/libs/mongodb";


/*
        GitHubProvider({
          clientId: process.env.GITHUB_ID as string,
          clientSecret: process.env.GITHUB_SECRET as string
        }),
*/
/*
export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { db } = await connectToDatabase();
        const collection = db.collection("users");
        const user = await collection.findOne({ 
            email: credentials.email
        });
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    jwt: true,
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
      }
      return session;
    },
  },
});*/

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "username", type: "text", placeholder: "jsmith" },
          password: { label: "password", type: "password" }
        },
        async authorize(credentials, req) {

          const { db } = await connectToDatabase();
          const collection = db.collection("accounts");
          const user = credentials ? await collection.findOne({
            username: credentials.username
          }) : null


          if (!user) {
            throw new Error('No account found!');
          }

          return user

        }
    })
  ],
  session: {
    strategy: 'jwt',
    //jwt: true,
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.username = token.username
        session.user.email = token.email
        session.user.role = token.role
      }
      return session;
    },
  },
})

export { handler as GET, handler as POST }