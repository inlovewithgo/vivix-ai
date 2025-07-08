"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Store, MessageSquare, User, PlusCircle, Grid, Database, Wallet, Coins, Rocket } from 'lucide-react'
import { useState } from "react"
import { useGlobal } from "@/context/GlobalStateContext"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { Sidebar } from "@/components/sidebar"

export default function CreateAgent() {
    const router = useRouter();
    const [deployType, setDeployType] = useState('verifiable');
    const [template, setTemplate] = useState('eliza');
    const [agentName, setAgentName] = useState('');

    const createAIAgent = async () => {
        const storage = window.localStorage;
        const username = storage?.getItem('username');
        if (!username) return toast.error("Please sign in to continue");
        if (!agentName.trim()) return toast.error("Please provide a name for your agent");
        
        const id = Math.random().toString(36).substring(7);
        const agent = {
            id,
            name: agentName,
            deployType,
            template,
        }
        
        const agents = JSON.parse(storage?.getItem('agents') || '[]');
        storage?.setItem('agents', JSON.stringify([...agents, agent]));
        toast.success("Agent created successfully");
        router.push('/');
    }

    return (
        <div className="flex max-h-screen overflow-hidden">
            <Sidebar />
            <div className="min-h-screen bg-slate-50 p-6 text-black overflow-y-auto">
                <div className="mx-auto max-w-5xl">
                    {/* Header section remains the same */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="mb-6 flex flex-col items-center">
                                <div className="mb-4 rounded-full bg-violet-100 p-3">
                                    <Rocket className="h-6 w-6 text-violet-600" />
                                </div>
                                <h2 className="mb-2 text-2xl font-semibold">Deploy an agent</h2>
                                <p className="text-center text-gray-500">
                                    Fill in the details and launch your agent into Vivix
                                </p>
                            </div>

                            {/* Add Agent Name Input */}
                            <div className="space-y-4 mb-6">
                                <Label htmlFor="agentName">Agent Name</Label>
                                <Input
                                    id="agentName"
                                    placeholder="Enter your agent's name"
                                    value={agentName}
                                    onChange={(e) => setAgentName(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-6">
                                {/* Deployment Type Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Select deployment type</h3>
                                    <RadioGroup defaultValue="verifiable" className="space-y-4" onValueChange={(value) => setDeployType(value)}>
                                        <div className={`relative rounded-lg border-2 ${deployType == "verifiable" ? 'border-pink-500' : 'border-transparent hover:border-gray-200'} p-4`}>
                                            <RadioGroupItem value="verifiable" id="verifiable" className="absolute right-4 top-4" />
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-pink-100 p-2">
                                                    <svg
                                                        className="h-5 w-5 text-pink-500"
                                                        fill="none"
                                                        height="24"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                    >
                                                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                                                        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                                                        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">Verifiable(TEE)</h4>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Verifiable agents run in a Trusted Execution Environment (TEE)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Non-verifiable option remains the same */}
                                    </RadioGroup>
                                </div>

                                {/* Template Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Select a template</h3>
                                    <RadioGroup defaultValue="eliza" className="grid grid-cols-1 gap-4 md:grid-cols-2" onValueChange={(value) => setTemplate(value)}>
                                        {/* Template options remain the same */}
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-between">
                                <Button variant="outline" className="text-white">
                                    <svg
                                        className="mr-2 h-4 w-4"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                    >
                                        <path d="m12 19-7-7 7-7" />
                                    </svg>
                                    Back
                                </Button>
                                <Button onClick={createAIAgent}>Create</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
