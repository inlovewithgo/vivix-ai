"use client";
import { Sidebar } from "@/components/sidebar"
import { SuggestionCard } from "@/components/suggestion-card"
import { Button } from "@/components/ui/button"
import { Gamepad2, Calculator, Cloud, ChevronLeft, Send, Image, BarChart3, PlusCircle } from 'lucide-react'
import { useGlobal } from "@/context/GlobalStateContext"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react";

const [agentName, setAgentName] = useState('');



export default function Page() {
    const { isOpen, setOpen } = useGlobal()
    return (
        <div className="flex max-h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 bg-[#faf8ff] overflow-y-auto h-screen">
                <div className="p-4 h-full">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8">
                                <img src="/logo-v.png" alt="logo" className="w-full h-full" />
                            </div>
                            <h1 className="text-xl font-semibold text-black">Agent Marketplace</h1>
                        </div>
                    </div>

                    <div className="max-w-full h-full mx-auto flex flex-col text-center justify-center items-center">
                        <img src="/coming-soon.webp" alt="logo" className="w-40 h-40 rounded-2xl mx-auto mb-4" />
                        <p className="text-gray-800 mb-8 font-semibold">
                            Coming Soon!
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}