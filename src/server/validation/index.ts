import { z } from "zod";

export const createEntrySchema = z.object({
    indoorWorkout: z.string().trim().min(1).max(255),
    outdoorWorkout: z.string().trim().min(1).max(255),
    pagesRead: z.coerce.number().gte(1),
    drankWater: z.boolean(),
    followedDiet: z.boolean(),
})

export const createChallengeAndBookSchema = z.object({
    book: z.string().trim().min(1).max(255),
    diet: z.string().trim().min(1).max(255),
})