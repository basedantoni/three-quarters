"use client"

import { Modal } from "@/app/@modal/(.)entries/modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEntry } from "@/server/actions";
import { FileUp } from "lucide-react";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { createEntrySchema } from "@/server/validation";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from "zod";
  
const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant={pending ? "ghost" : "default"} type="submit">{pending ? 'Submitting...' : 'Submit'}</Button>
  );
};

const initialValues = {
    errors: undefined,
    indoorWorkout: "",
    outdoorWorkout: "",
    pagesRead: 0,
    drankWater: false,
    followedDiet: false,
}

export default function EntryCreateModal() {
    const [formState, formAction] = useFormState(createEntry, initialValues);

    const form = useForm<z.infer<typeof createEntrySchema>>({
      resolver: zodResolver(createEntrySchema),
      defaultValues: initialValues,
    });

    useEffect(() => {
        if (Array.isArray(formState?.errors)) {
            // Check if formState.errors is an array before iterating
            formState.errors.forEach((error) => {
            form.setError(error.field, { message: error.message });
            });
        }
    }, [formState?.errors]);

    const handleUpload = () => {
        console.log("Upload");
    }

    return (
        <Modal {...form}>
            <form name="entry" action={formAction} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="indoorWorkout">Indoor Workout:</Label>
                    <Input 
                        className={formState?.errors?.indoorWorkout ? 'border-red-500' : ''} 
                        type="text" 
                        id="indoorWorkout" 
                        name="indoorWorkout" 
                        placeholder="Weightlifting" 
                    />
                    <p className="text-sm text-red-500">{formState?.errors?.indoorWorkout}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="outdoorWorkout">Outdoor Workout:</Label>
                    <Input 
                        className={formState?.errors?.outdoorWorkout ? 'border-red-500' : ''} 
                        type="text" 
                        id="outdoorWorkout" 
                        name="outdoorWorkout" 
                        placeholder="Running" 
                    />
                    <p className="text-sm text-red-500">{formState?.errors?.outdoorWorkout}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="pagesRead">Pages Read:</Label>
                    <Input 
                        className={formState?.errors?.outdoorWorkout ? 'border-red-500' : ''} 
                        type="number" 
                        id="pagesRead" 
                        name="pagesRead" 
                        placeholder="10+" 
                    />
                    <p className="text-sm text-red-500">{formState?.errors?.pagesRead}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Checkbox id="drankWater" name="drankWater" />
                        <label
                            htmlFor="drankWater"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Drank Water (1 Gallon)
                        </label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="followedDiet" name="followedDiet" />
                        <label
                            htmlFor="followedDiet"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Followed Diet
                        </label>
                    </div>
                </div>
                <Button 
                    onClick={() => handleUpload()} 
                    className="gap-1" 
                    variant="secondary"
                    type="button"
                >
                        <span>Upload Progress</span> 
                        <FileUp className="h-4 w-4" />
                </Button>
                <SubmitButton />
            </form>
        </Modal>
    );
}