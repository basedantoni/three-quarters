import { signOut } from "@/server/auth";
import SignOutButton from "./signout-button";

export default function Me() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Hello
      <SignOutButton signOut={async () => {
        "use server"
        await signOut({redirectTo: "/auth/login"})
      }} />
    </main>
  );
}
