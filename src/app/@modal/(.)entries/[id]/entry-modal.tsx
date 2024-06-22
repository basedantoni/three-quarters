"use client"

import { useRef } from "react";
import Modal from "../modal";
import { Label } from "@/components/ui/label";
import { Entry } from "@/types/entry";
import { CircleCheck, CircleX } from "lucide-react";

export default function EntryModal({ entry }: { entry: Entry }) {
  const modalRef = useRef<any>(null);

  let date: Date = entry.createdAt;
  let formattedDate = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();

  return (
    <Modal ref={modalRef}>
      <div className="flex flex-col gap-4 pb-5">
        <div className="flex flex-col gap-1">
            <Label className="text-xl font-bold">{formattedDate}</Label>
        </div>
        <div className="flex flex-col gap-1">
            <Label>Indoor Workout</Label>
            <p className="text-sm text-gray-700 dark:text-gray-400">{entry.indoorWorkout}</p>
        </div>
        <div className="flex flex-col gap-1">
            <Label>Outdoor Workout</Label>
            <p className="text-sm text-gray-700 dark:text-gray-400">{entry.outdoorWorkout}</p>
        </div>
        <div className="flex flex-col gap-1">
            <Label>Pages Read</Label>
            <p className="text-sm text-gray-700 dark:text-gray-400">TODO: ADD PAGES READ</p>
        </div>
        <div className="flex gap-2.5">
            <div className="flex items-center gap-0.5">
                <Label className="text-xs">Drank Water</Label>
                {entry.drankWater ? <CircleCheck className="stroke-green-500 h-4 w-4 stroke-1" /> : <CircleX className="h-4 w-4 stroke-1" />}
            </div>
            <div className="flex items-center gap-0.5">
                <Label className="text-xs">Followed Diet</Label>
                {entry.followedDiet ? <CircleCheck className="stroke-green-500 h-4 w-4 stroke-1" /> : <CircleX className="h-4 w-4 stroke-1" />}
            </div>
        </div>
      </div>
    </Modal>
  );
}