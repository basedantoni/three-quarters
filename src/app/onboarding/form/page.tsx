"use client"

import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { createChallengeAndBookSchema } from "@/server/validation";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createChallengeAndBook } from '@/server/actions';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant={pending ? "ghost" : "default"} type="submit">{pending ? 'Submitting...' : 'Submit'}</Button>
  );
};
  
const initialValues = {
    errors: undefined,
    message: "",
    type: "",
    book: "",
    diet: "",
}

export default function Form() {
    const searchParams = useSearchParams()

    const difficulty = searchParams.get('difficulty')
    initialValues.type = difficulty || "hard"
    const [formState, formAction] = useFormState(createChallengeAndBook, initialValues);

    const form = useForm<z.infer<typeof createChallengeAndBookSchema>>({
      resolver: zodResolver(createChallengeAndBookSchema),
      defaultValues: initialValues,
    });

    useEffect(() => {
      console.log(formState?.errors);
      if (Array.isArray(formState?.errors)) {
        // Check if formState.errors is an array before iterating
        formState.errors.forEach((error) => {
          form.setError(error.field, { message: error.message });
        });
      }
    }, [formState?.errors]);

    return (
      <div className="flex flex-col px-7 py-10">
        <Card className='p-6'>
          <form name="entry" action={formAction} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                  <Label htmlFor="book">What book are you reading?</Label>
                  <Input 
                      className={formState?.errors?.book ? 'border-red-500' : ''} 
                      type="text" 
                      id="book" 
                      name="book" 
                      placeholder="Atomic Habits" 
                  />
                  <p className="text-sm text-red-500">{formState?.errors?.book}</p>
              </div>
              <div className="flex flex-col gap-2">
                  <Label htmlFor="outdoorWorkout">What diet are you following?</Label>
                  <Input 
                      className={formState?.errors?.diet ? 'border-red-500' : ''} 
                      type="text" 
                      id="diet" 
                      name="diet" 
                      placeholder="Keto" 
                  />
                  <p className="text-sm text-red-500">{formState?.errors?.diet}</p>
              </div>
              <SubmitButton />
          </form>
        </Card>
      </div>
    )
}