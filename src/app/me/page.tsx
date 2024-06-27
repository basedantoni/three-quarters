import SignOutButton from "./signout-button";
import { signOut, auth } from "@/server/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";


export default async function Me() {
  const session = await auth()

  if (!session?.user) {
    return null;
  }

  console.log(session)
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex w-full justify-between px-5 py-2.5">
        <Link href="/">
          <p className="flex gap-2 items-center"><ArrowLeftCircle className="h-4 w-4" /> Back</p>
        </Link>
        <Avatar>
          <AvatarImage src={session.user.image || "https://github.com/shadcn.png"} alt={`@${session.user?.email || "user"}`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      
      <SignOutButton signOut={async () => {
        "use server"
        await signOut({redirectTo: "/auth/login"})
      }} />
    </main>
  );
}
