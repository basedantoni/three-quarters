'use server'

import { revalidatePath } from 'next/cache'
import { createChallengeAndBookSchema, createEntrySchema } from "@/server/validation";
import { entries, challenges, books } from './db/schema';
import { db } from './db';
import { auth } from './auth';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

export async function createEntry(challengeId: number, prevState: any, formData: FormData) {
    const parse = createEntrySchema.safeParse({
        indoorWorkout: formData.get('indoorWorkout'),
        outdoorWorkout: formData.get('outdoorWorkout'),
        pagesRead: formData.get('pagesRead'),
        drankWater: formData.get('drankWater') === 'on',
        followedDiet: formData.get('followedDiet') === 'on',
    })

    if (parse.success) {
        const newEntry = {
            challengeId: challengeId,
            indoorWorkout: parse.data.indoorWorkout,
            outdoorWorkout: parse.data.outdoorWorkout,
            drankWater: parse.data.drankWater,
            followedDiet: parse.data.followedDiet,
            completed: true,
        };
        const entry = await db.insert(entries).values(newEntry).returning({ id: entries.id })

        revalidatePath("/")
        return { 
            message: "success",
            errors: undefined,
            indoorWorkout: "",
            outdoorWorkout: "",
            pagesRead: 0,
            drankWater: false,
            followedDiet: false,
            entryId: entry[0] ? entry[0].id : 0,
        }
    } else {
        return {
            message: "error",
            errors: parse?.error?.flatten().fieldErrors,
            indoorWorkout: "",
            outdoorWorkout: "",
            pagesRead: 0,
            drankWater: false,
            followedDiet: false,
        }
    }
}

export async function createChallengeAndBook(formState: any, formData: FormData) {
    const parse = createChallengeAndBookSchema.safeParse({
        book: formData.get('book'),
        diet: formData.get('diet'),
    })

    const session = await auth()
    if (!session?.user) {
        return {
            errors: undefined,
            message: "unauthenticated",
            type: "",
            book: "",
            diet: "",
        }
    }

    if (parse.success) {
        const newChallenge = {
            type: "hard",
            userId: session?.user.id,
        };

        const challenge = await db.insert(challenges).values(newChallenge).returning({ id: challenges.id })
        console.log(challenge)

        if (!challenge[0]) {
            return {
                errors: undefined,
                message: "error inserting challenge",
                type: "",
                book: "",
                diet: "",
            }
        }

        const newBook = {
            title: parse.data.book,
            challengeId: challenge[0].id,
            currentlyReading: true,
        }

        await db.insert(books).values(newBook)

        revalidatePath("/")
        redirect("/")
    } else {
        return {
            errors: parse?.error?.flatten().fieldErrors,
            message: "field errors",
            type: "",
            book: "",
            diet: "",
        }
    }
}   

export async function addEntryProgressPicture(entryId: number, url: string) {
    await db.update(entries).set({ progressUrl: url }).where(eq(entries.id, entryId))
}