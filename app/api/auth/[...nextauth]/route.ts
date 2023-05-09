import GitHubProvider from "next-auth/providers/github";
import NextAuth from "next-auth"

const handler = NextAuth({
    providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_ID as string,
          clientSecret: process.env.GITHUB_SECRET as string
        })
      ]
})

export { handler as GET, handler as POST }