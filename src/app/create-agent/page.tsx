"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Store, MessageSquare, User, PlusCircle, Grid, Database, Wallet, Coins, Rocket } from 'lucide-react'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sidebar } from "@/components/sidebar"
import { toast } from "react-toastify"

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
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-pink-500 p-2">
                                <svg
                                    className="h-5 w-5 text-white"
                                    fill="none"
                                    height="24"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    width="24"
                                >
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-semibold">Create Agent</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-98q1KQ1Yz6w6wpXJEkI9eoCdbYzOtK.png" alt="User" />
                                    <AvatarFallback>NC</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="text-sm font-medium">Nico William</div>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <svg
                                            className="h-4 w-4 text-yellow-400"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                        <span>2/3 Credits</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col items-center">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                                    1
                                </div>
                                <div className="mt-2 text-sm font-medium text-pink-600">Deploy</div>
                            </div>
                            <div className="relative flex-1 mx-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="h-0.5 w-full bg-gray-200"></div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                                    2
                                </div>
                                <div className="mt-2 text-sm text-gray-500">Template</div>
                            </div>
                            <div className="relative flex-1 mx-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="h-0.5 w-full bg-gray-200"></div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                                    3
                                </div>
                                <div className="mt-2 text-sm text-gray-500">Integration</div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
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

                            <div className="space-y-6">
                                {/* Agent Name Input */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Agent Name</h3>
                                    <input
                                        type="text"
                                        placeholder="Enter agent name"
                                        value={agentName}
                                        onChange={(e) => setAgentName(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none"
                                    />
                                </div>

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

                                        <div className={`relative rounded-lg border-2 ${deployType == "non-verifiable" ? 'border-pink-500' : 'border-transparent hover:border-gray-200'} p-4`}>
                                            <RadioGroupItem value="non-verifiable" id="non-verifiable" className="absolute right-4 top-4" />
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-gray-100 p-2">
                                                    <svg
                                                        className="h-5 w-5 text-gray-500"
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
                                                    <h4 className="font-medium">Non-Verifiable(NVM)</h4>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Non-verifiable agents run on standard hardware
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Template Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Select a template</h3>
                                    <RadioGroup defaultValue="eliza" className="grid grid-cols-1 gap-4 md:grid-cols-2" onValueChange={(value) => setTemplate(value)}>
                                        <div className={`relative rounded-lg border-2 p-4 ${template == "agentkit" ? 'border-pink-500' : 'border-transparent hover:border-gray-200'}`}>
                                            <RadioGroupItem value="agentkit" id="agentkit" className="absolute right-4 top-4" />
                                            <div>
                                                <h4 className="font-medium">Agentkit</h4>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    The Agentkit by Coinbase simplifies bringing your AI Agents onchain
                                                </p>
                                            </div>
                                        </div>

                                        <div className={`relative rounded-lg border-2 p-4 ${template == "base-agent" ? 'border-pink-500' : 'border-transparent hover:border-gray-200'}`}>
                                            <RadioGroupItem value="base-agent" id="base-agent" className="absolute right-4 top-4" />
                                            <div>
                                                <h4 className="font-medium">Base Agent</h4>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    A product by Coinbase to build on-chain agents
                                                </p>
                                            </div>
                                        </div>

                                        <div className={`relative rounded-lg border-2 p-4 ${template == "eliza" ? 'border-pink-500' : 'border-transparent hover:border-gray-200'}`}>
                                            <RadioGroupItem value="eliza" id="eliza" className="absolute right-4 top-4" />
                                            <div>
                                                <h4 className="font-medium">Eliza</h4>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Eliza is a simple, fast, and lightweight AI agent framework
                                                </p>
                                            </div>
                                        </div>

                                        <div className={`relative rounded-lg border-2 p-4 ${template == "custom" ? 'border-pink-500' : 'border-transparent hover:border-gray-200'}`}>
                                            <RadioGroupItem value="custom" id="custom" className="absolute right-4 top-4" />
                                            <div>
                                                <h4 className="font-medium">Custom</h4>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Custom image running by users
                                                </p>
                                            </div>
                                        </div>
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

