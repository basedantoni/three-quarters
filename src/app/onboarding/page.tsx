import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function OnboardingPage() {
    return (
        <div className="flex flex-col px-7 py-10">
            <Image
                src="/placeholder-02.png"
                alt="onbboarding"
                width={0}
                height={0}
                sizes="100%"
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            />
            <div className="flex flex-col p-2.5 gap-2.5">
                <h1 className="text-xl font-bold">Welcome to the Three Quarters Challenge</h1>
                <span className="text-base leading-[150%]">
                    Every day is a opportunity to challenge yourself. This will serve as your tracker to keep you accountable to your goals.
                    <br />
                    <br />
                    Three Quarters includes criteria that if done everyday results in a stronger and better version of yourself:
                    <ul className="list-disc list-inside">
                        <li>Health</li>
                        <li>Mental Wellness</li>
                        <li>Hydration</li>
                    </ul>
                </span>
            </div>
            <Button asChild>
                <Link href="/onboarding/difficulty">Next</Link>
            </Button>
        </div>
    )
}