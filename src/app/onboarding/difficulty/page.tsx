import DifficultySelection from "./difficulty-selection";

export default function OnboardingPage() {
    return (
        <div className="flex flex-col px-7 py-10 gap-12">
            <h1 className="text-xl font-semibold text-center">Choose your difficulty:</h1>
            <DifficultySelection />
        </div>
    )
}