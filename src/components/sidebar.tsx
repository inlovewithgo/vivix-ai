"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Store, MessageSquare, User, PlusCircle, Grid, Database, Wallet, Coins } from 'lucide-react'
import { useState } from "react"
import { useGlobal } from "@/context/GlobalStateContext"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "react-toastify";

export function Sidebar() {
  const { isOpen, setOpen } = useGlobal();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const storage = typeof window !== 'undefined' ? window.localStorage : null;
  const username = storage?.getItem('username');
  const [newUsername, setNewUsername] = useState<string | null | undefined>(username);
  return (
    <div>
      <div className={`${isOpen ? 'w-64' : 'w-20'} h-screen bg-white border-r flex flex-col transition-all duration-300 ease-in-out transform`}>
        <div className="p-4 border-b">
          <div className={`flex items-center gap-2 ${!isOpen && 'justify-center'}`}>
            <div className="w-8 h-8">
              <img src="/logo-v.png" alt="logo" className="w-full h-full" />
            </div>
            {isOpen && <span className="font-semibold text-xl text-black text-nowrap whitespace-nowrap">Vivix AI</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 text-nowrap whitespace-nowrap"
          >
            <MessageSquare className="w-5 h-5" />
            {isOpen && "AI Agent Chat"}
          </Link>

          <Link
            href="/ai-agent"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 text-nowrap whitespace-nowrap"
          >
            <User className="w-5 h-5" />
            {isOpen && "My AI Agent"}
          </Link>

          <Link
            href="/create-agent"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 text-nowrap whitespace-nowrap"
          >
            <Grid className="w-5 h-5" />
            {isOpen && "Create Agent"}
          </Link>

          <Link
            href="/agent-marketplace"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 text-nowrap whitespace-nowrap"
          >
            <Database className="w-5 h-5" />
            {isOpen && "Agent Marketplace"}
          </Link>
        </nav>
        <div className="py-4 px-4 border-t">
          <Dialog open={isModelOpen} onOpenChange={setIsModelOpen}>
            <DialogTrigger asChild>
            <button 
  className="flex items-center w-full justify-center gap-2 bg-[#FF1B8D] hover:bg-[#FF1B8D]/90 text-white rounded-md px-4 py-2" 
  role="button"
>
  <Wallet className="w-4 h-4" />
  {newUsername ? `Signed ${newUsername}` : isOpen && "Sign In"}
</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input value={newUsername ?? ""} onChange={(e) => setNewUsername(e.target.value)} id="username" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  storage?.removeItem('username');
                  setIsModelOpen(false);
                  setNewUsername("");
                  toast("Username reset successfully");
                }}>Reset Username</Button>
                <Button onClick={() => {
                  storage?.setItem('username', newUsername ?? "");
                  setIsModelOpen(false);
                  toast("Username saved successfully");
                }}>Save Username</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

