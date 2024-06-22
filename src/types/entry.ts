export interface Entry {
    id: number;
    challengeId: number;
    indoorWorkout: string;
    outdoorWorkout: string;
    drankWater: boolean;
    followedDiet: boolean;
    progressUrl: string;
    completed: boolean;
    createdAt: Date;
}