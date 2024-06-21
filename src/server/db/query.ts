import { db } from "@/server/db"
import { entries } from "@/server/db/schema"
import { desc } from 'drizzle-orm';

// Entries
export const getAllEntries = async () => await db.select().from(entries)
export const getFirstEntry = async () => await db.select().from(entries).orderBy(desc(entries.createdAt)).limit(1)