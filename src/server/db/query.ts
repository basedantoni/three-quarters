import { db } from "@/server/db"
import { challenges, entries } from "@/server/db/schema"
import { desc, eq, count } from 'drizzle-orm';

// Entries
export const getAllEntries = async () => await db.select().from(entries)
export const getLatestEntry = async (challengeId: number) => {
    return await db.select().from(entries).where(eq(entries.challengeId, challengeId)).orderBy(desc(entries.createdAt)).limit(1)
}
export const getEntryCount = async (challengeId: number) => {
    return await db.select({ count: count() }).from(entries).where(eq(entries.challengeId, challengeId))
}

// Challenges
export const getLatestChallenge = async (userId: string) => {
    return await db.select().from(challenges).where(eq(challenges.userId, userId)).orderBy(desc(challenges.createdAt)).limit(1)
}