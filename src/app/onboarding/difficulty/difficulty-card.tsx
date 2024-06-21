"use client"

import { Box, Boxes } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'

export default function DifficultyCard({ type }: { type: string }) {
    const router = useRouter()

    return (
        <motion.div 
            className="w-2/3 h-[240px] bg-white rounded-3xl shadow-md flex flex-col justify-between items-center border border-slate-300 hover:border-2 hover:cursor-pointer"
            whileHover={{ 
                scale: 1.03, 
                transition: { duration: 0.3 }, 
                shadow: "",
            }}
            onClick={() => router.push(`/onboarding/form?difficulty=${type}`)}
        >
            <div className="h-full flex flex-col gap-2 items-center justify-center">
                {type === "hard" 
                    ? <Boxes className="w-24 h-24 stroke-1" /> 
                    : <Box className="w-24 h-24 stroke-1" />
                }
                <h2 className="text-3xl font-semibold">
                    <span className="text-2xl font-bold">75</span> {type}
                </h2>
            </div> 
        </motion.div>
    )
}