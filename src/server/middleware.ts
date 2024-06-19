import NextAuth from "next-auth";
import { authConfig } from "@/server/auth";

export default NextAuth(authConfig)

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.png|.svg).*)"],
}