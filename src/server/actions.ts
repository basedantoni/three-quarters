'use server'

import { revalidatePath } from 'next/cache'
import { createEntrySchema } from "@/server/validation";
import { entries } from './db/schema';
import { db } from './db';

export async function createEntry(formState: any, formData: FormData) {
    const parse = createEntrySchema.safeParse({
        indoorWorkout: formData.get('indoorWorkout'),
        outdoorWorkout: formData.get('outdoorWorkout'),
        pagesRead: formData.get('pagesRead'),
        drankWater: formData.get('drankWater') === 'on',
        followedDiet: formData.get('followedDiet') === 'on',
    })

    if (parse.success) {
        const newEntry = {
            challengeId: 1, // replace with a valid challenge ID
            indoorWorkout: parse.data.indoorWorkout,
            outdoorWorkout: parse.data.outdoorWorkout,
            drankWater: parse.data.drankWater,
            followedDiet: parse.data.followedDiet,
            completed: true,
        };
        await db.insert(entries).values(newEntry)

        return { 
            errors: undefined,
            indoorWorkout: "",
            outdoorWorkout: "",
            pagesRead: 0,
            drankWater: false,
            followedDiet: false,
        }
    } else {
        return {
            errors: parse?.error?.flatten().fieldErrors,
            indoorWorkout: "",
            outdoorWorkout: "",
            pagesRead: 0,
            drankWater: false,
            followedDiet: false,
        }
    }
    revalidatePath("/entries/create")
}