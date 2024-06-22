"use client"

import Modal from "@/app/@modal/(.)entries/modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addEntryProgressPicture, createEntry } from "@/server/actions";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { createEntrySchema } from "@/server/validation";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { UploadButton } from "@/utils/uploadthing";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
  
const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant={pending ? "ghost" : "default"} type="submit">{pending ? 'Submitting...' : 'Submit'}</Button>
  );
};

const initialValues = {
    message: "",
    errors: undefined,
    indoorWorkout: "",
    outdoorWorkout: "",
    pagesRead: 0,
    drankWater: false,
    followedDiet: false,
    entryId: 0,
}

export default function EntryCreateModal() {
    const searchParams = useSearchParams()
    const id = searchParams.get('challenge')

    const createEntryWithId = createEntry.bind(null, Number(id))

    const [formState, formAction] = useFormState(createEntryWithId, initialValues);
    const [step, setStep] = useState(1)

    const form = useForm<z.infer<typeof createEntrySchema>>({
      resolver: zodResolver(createEntrySchema),
      defaultValues: initialValues,
    });

    const formRef = useRef<HTMLFormElement>(null);
    const modalRef = useRef<any>(null);

    useEffect(() => {
        if (formState?.message === "success") {
            formRef.current?.reset();
            setStep(2)
        } else if (Array.isArray(formState?.errors)) {
            // Check if formState.errors is an array before iterating
            formState.errors.forEach((error) => {
            form.setError(error.field, { message: error.message });
            });
        }
    }, [formState]);

    return (
        <Modal ref={modalRef} {...form}>
            {step === 1 && <form name="entry" ref={formRef} action={formAction} className="flex flex-col gap-4">
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
                <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-0.5">
                        <Checkbox id="drankWater" name="drankWater" />
                        <label
                            htmlFor="drankWater"
                            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Drank Water
                        </label>
                    </div>
                    <div className="flex items-center gap-0.5">
                        <Checkbox id="followedDiet" name="followedDiet" />
                        <label
                            htmlFor="followedDiet"
                            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Followed Diet
                        </label>
                    </div>
                </div>
                <SubmitButton />
            </form>}

            {step === 2 && 
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="progress"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Upload Progress:
                    </label>
                    <UploadButton
                        className="ut-button:inline-flex ut-button:items-center ut-button:justify-center ut-button:whitespace-nowrap ut-button:rounded-md ut-button:text-sm ut-button:font-medium ut-button:ring-offset-white ut-button:transition-colors ut-button:focus-visible:outline-none ut-button:focus-visible:ring-2 ut-button:focus-visible:ring-gray-950 ut-button:focus-visible:ring-offset-2 ut-button:disabled:pointer-events-none ut-button:disabled:opacity-50 ut-button:dark:ring-offset-gray-950 ut-button:dark:focus-visible:ring-gray-300 ut-button:w-full ut-button:bg-gray-100 ut-button:text-gray-900 ut-button:hover:bg-gray-100/80 ut-button:dark:bg-gray-800 ut-button:dark:text-gray-50 ut-button:dark:hover:bg-gray-800/80 ut-button:gap-1"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            if (!res[0]) return;
                            addEntryProgressPicture(formState?.entryId ? formState.entryId : 0, res[0].url)
                            modalRef.current.dismiss();
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                </div>
            }
        </Modal>
    );
}