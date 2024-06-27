import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Menubar } from "@/components/ui/menubar"
import { getLatestChallenge, getLatestEntry, getEntriesByChallengeId } from "@/server/db/query";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { CircleCheck, PlusIcon, UserCircle } from "lucide-react";
import { ModeToggle } from "@/components/theme/mode-toggle";

export const dynamic = "force-dynamic";

function AddEntryButton( { disabled, challengeId } : { disabled: boolean, challengeId: number } ) {
  return disabled
    ? 
    <div className="flex gap-2 items-center">
      <p className="text-lg">You completed todays challenge</p>
      <CircleCheck className="h-4 w-4" />
    </div>
    :
    <Button size={"icon"} asChild>
      <Link href={`/entries/create?challenge=${challengeId}`}><PlusIcon className="h-6 w-6" /></Link>
    </Button>
}

export default async function HomePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/onboarding");
  }

  const challenge = await getLatestChallenge(session.user.id);

  if (!Array.isArray(challenge) || challenge.length <= 0 || !challenge[0]) {
    redirect("/onboarding");
  }

  function getYesterdaysDate() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday;
  }

  
  const entry = await getLatestEntry(challenge[0].id);
  let lastEntryDate: Date;

  if (!Array.isArray(entry) || entry.length <= 0 || !entry[0]) {
    lastEntryDate = getYesterdaysDate();
  } else {
    lastEntryDate = new Date(entry[0].createdAt);
  }

  function isSameDayUTC(date1: Date, date2: Date) {
    return (
      date1.getUTCFullYear() === date2.getUTCFullYear() &&
      date1.getUTCMonth() === date2.getUTCMonth() &&
      date1.getUTCDate() === date2.getUTCDate()
    );
  }

  const entries = await getEntriesByChallengeId(challenge[0].id);
  const dots = Array(75).fill(0);
  entries.map((entry, i) => {
    if (entry.completed) {
      dots[i] = entry.id
    }
  })

  return (
    <main className="relative flex min-h-svh flex-col items-center py-8 px-5 justify-between">
      <div className="absolute top-3 right-4">
        <ModeToggle />
      </div>
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-2xl font-bold">hello.</h1>
        <Card className="w-full max-w-[350px] flex flex-wrap gap-3 px-5 py-8 items-center justify-center">
          {dots.map((u, i) => {
            return Boolean(u)
              ? <Link key={i} href={`/entries/${u}`} className="w-4 h-4 rounded-full bg-black dark:bg-white"></Link> 
              : <div key={i} className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800"></div>;
          })}
        </Card>
      </div>
      <Menubar className="w-full py-8 px-8 gap-3 justify-center">
        <AddEntryButton disabled={isSameDayUTC(lastEntryDate, new Date())} challengeId={challenge[0].id} />
        <Button size={"icon"} asChild>
          <Link href={`/profile`}><UserCircle className="h-6 w-6" /></Link>
        </Button>
      </Menubar>
    </main>
  );
}
