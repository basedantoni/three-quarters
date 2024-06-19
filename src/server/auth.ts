import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth";
import Google from "next-auth/providers/google"

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema";

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Google],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user
      const paths = ["/me", "/entries"]
      const isProtected = paths.some(path => nextUrl.pathname.startsWith(path))

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("api/auth/signin", nextUrl.origin)
        redirectUrl.searchParams.set("callbackUrl", nextUrl.href)
        return Response.redirect(redirectUrl)
      }

      return true
    }
  },
} satisfies NextAuthConfig

export const { handlers, auth, signOut } = NextAuth(authConfig)
