import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFirstEntry } from "@/server/db/query";
import Link from "next/link";

export default async function HomePage() {
  const entry = await getFirstEntry();

  console.log(entry.length > 0)

  return (
    <main className="flex min-h-screen flex-col items-center px-5">
      <h1>good evening.</h1>
      <Card className="w-full max-w-[350px] flex flex-wrap gap-3.5 px-5 py-7 items-center justify-center">
        {Array(75).fill(0).map((u, i) => {
          return <div key={i} className="w-4 h-4 rounded-full bg-slate-200"></div>;
        })}
      </Card>
      <Button asChild size={"round"}>
        <Link href="/entries/create">+</Link>
      </Button>
    </main>
  );
}
