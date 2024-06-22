import { getEntryById } from "@/server/db/query";
import EntryModal from "./entry-modal";
import { redirect } from "next/navigation";
import { Entry } from "@/types/entry";

export default async function EntryPage({
  params: { id: entryId },
}: {
  params: { id: string };
}) {
  const entryResult = await getEntryById(Number(entryId));

  if (!Array.isArray(entryResult) || entryResult.length <= 0 || !entryResult[0]) {
    redirect("/");
  }

  const entry: any = entryResult[0]

  return (
    <EntryModal entry={entry} />
  );
}