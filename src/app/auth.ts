import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:4000/api/auth/signin", {
          method: 'POST',
          body: JSON.stringify(credentials),
          credentials: 'include',
          headers: { "Content-Type": "application/json" }
        })

        if (res.ok) {
          const user = await res.json()
          return user
        }

        return null
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
      }
      return session
    }
  }
})