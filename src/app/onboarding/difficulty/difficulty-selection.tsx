import DifficultyCard from "./difficulty-card";

export default function DifficultySelection() {
    return (
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <DifficultyCard type="medium" />
            <DifficultyCard type="hard" />
        </div>
    )
}