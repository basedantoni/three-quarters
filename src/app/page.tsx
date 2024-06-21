import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLatestChallenge, getEntryCount } from "@/server/db/query";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/onboarding");
  }

  const challenge = await getLatestChallenge(session.user.id);

  if (!Array.isArray(challenge) || challenge.length <= 0 || !challenge[0]) {
    redirect("/onboarding");
  }

  const entryCountResult = await getEntryCount(challenge[0].id);
  const entryCount = entryCountResult?.[0]?.count ?? 0; // Default to 0 if undefined
  const dots = Array(75).fill(0);

  for (let i = 0; i < entryCount; i++) {
    dots[i] = 1;
  }

  return (
    <main className="relative flex min-h-svh flex-col items-center py-8 px-5 justify-between">
      <div className="flex flex-col items-center gap-5 mt-12">
        <h1 className="text-2xl font-bold">hello.</h1>
        <Card className="w-full max-w-[350px] flex flex-wrap gap-3.5 px-5 py-7 items-center justify-center">
          {dots.map((u, i) => {
            return Boolean(u)
              ? <div key={i} className="w-4 h-4 rounded-full bg-black"></div> 
              : <div key={i} className="w-4 h-4 rounded-full bg-slate-200"></div>;
          })}
        </Card>
      </div>
      <Button asChild size={"round"}>
        <Link href={`/entries/create?challenge=${challenge[0].id}`}>+</Link>
      </Button>
    </main>
  );
}
