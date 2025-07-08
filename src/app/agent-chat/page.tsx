"use client";
import { Sidebar } from "@/components/sidebar"
import { SuggestionCard } from "@/components/suggestion-card"
import { Button } from "@/components/ui/button"
import { Gamepad2, Calculator, Cloud, ChevronLeft, Send, Image, BarChart3, PlusCircle } from 'lucide-react'
import { useGlobal } from "@/context/GlobalStateContext"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Page() {
  const { isOpen, setOpen } = useGlobal();
  const [history, setHistory] = useState<{
    id?: string;
    role: string;
    isLoading?: boolean;
    parts?: { text: string }[];
  }[]>([]);
  const [message, setMessage] = useState<string>("");

  const sendMessage = async () => {
    try {
      setMessage("");
      const id = Math.random().toString(36).substring(7);
      const historyD = [...history, {
        role: "user",
        parts: [{ text: message }]
      }, {
        id,
        role: "model",
        parts: [{ text: "" }],
        isLoading: true
      }];
      setHistory(historyD);
      const response = await axios.post("/api/ai", {
        history: history.map((item) => ({
          role: item.role,
          parts: item.parts
        })),
        message
      });
      const text = response.data.text;
      const historyD2 = historyD.map((item) => {
        if (item.id == id) {
          item.isLoading = false;
          if (item.parts) item.parts[0].text = text;
        }
        return item;
      });
      setHistory(historyD2);
    } catch (error) {
      console.error(error);
    }
  };

  const scrollDivRef = useRef<any>(null);

  useEffect(() => {
    if (scrollDivRef.current) {
      scrollDivRef.current.scrollTop = scrollDivRef.current.scrollHeight;
    }
  }, [history]);

  const components = {
    h1: (props: any) => <h1 style={{ fontSize: "35px", fontWeight: "bolder", marginBottom: "0.5rem" }} {...props} />,
    h2: (props: any) => <h2 style={{ fontSize: "25px", fontWeight: "bolder", marginBottom: "0.5rem" }} {...props} />,
    h3: (props: any) => <h3 style={{ fontSize: "20px", fontWeight: "bolder", marginBottom: "0.5rem" }} {...props} />,
    h4: (props: any) => <h4 style={{ fontSize: "15px", fontWeight: "bolder", marginBottom: "0.5rem" }} {...props} />,
    h5: (props: any) => <h5 style={{ fontSize: "10px", fontWeight: "bolder", marginBottom: "0.5rem" }} {...props} />,
    h6: (props: any) => <h6 style={{ fontSize: "5px", fontWeight: "bolder", marginBottom: "0.5rem" }} {...props} />,
    p: (props: any) => <p style={{ fontSize: "15px", marginBottom: "0.5rem" }} {...props} />,
    code: (props: any) => <code style={{ fontSize: "15px", color: "red" }} {...props} />,
    img: (props: any) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img style={{ maxWidth: "300px", borderRadius: "2rem" }} {...props} />
      </div>
    ),
    ol: (props: any) => <ol style={{ fontSize: "15px", marginBottom: "0.5rem" }} type="1" {...props} />,
    ul: (props: any) => <ul style={{ fontSize: "15px", listStyleType: "circle", marginLeft: "25px", marginBottom: "0.5rem" }} {...props} />,
  };
  const [agents, setAgents] = useState<{
    id: string;
    name: string,
    deployType: string,
    template: string,
  }[]>(JSON.parse(localStorage.getItem("agents") || "[]"));
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  return (
    <div className="flex max-h-screen overflow-hidden">
      <Sidebar />
      <div className={`w-64 h-screen bg-white border-r flex flex-col transition-all duration-300 ease-in-out transform overflow-hidden`}>
        <div className="p-4">
          <div className={`flex items-center gap-2`}>
            {<span className="font-semibold text-2xl text-black">Chat with Vivix AI</span>}
          </div>
        </div>
        <Button variant="default" color="primary" className="mx-4 bg-gradient-to-r from-[#ffdbad] to-[#ff336f]">
          New Chat
        </Button>
        <div className="flex flex-col gap-4 p-4 overflow-y-auto">
          {agents.map((agent) => (
            <div onClick={() => {
              if (selectedAgent == agent.id) return setSelectedAgent("");
              setSelectedAgent(agent.id);
            }} className={`flex items-center gap-4 px-2 py-4 bg-[#f9f7ff] rounded-lg border-2 ${selectedAgent == agent.id ? 'border-pink-500' : 'border-transparent hover:border-gray-200'} cursor-pointer`}>
              <div className="w-10 h-10">
                <img src="/logo-v.png" alt="logo" className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-black">{agent.name}</span>
                <span className="text-gray-600">{agent.deployType}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <main className="flex-1 bg-[#faf8ff] overflow-y-auto">
        {!selectedAgent ? <div className="p-4 h-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5">
                <img src="/logo-v.png" alt="logo" className="w-full h-full" />
              </div>
              <h1 className="text-xl font-semibold text-black">Vivix AI</h1>
            </div>
          </div>

          <div className="max-w-full h-full mx-auto flex flex-col text-center justify-center items-center">
            <h2 className="text-2xl font-bold mb-4 text-black">No Chat Selected</h2>
            <p className="text-gray-600 mb-8">
              Describe your AI Dapp here, and we'll bring it to life!
            </p>
            <Button variant="default" color="primary" className="mx-4 bg-gradient-to-r from-[#ffdbad] to-[#ff336f]">
              Start Chat
            </Button>
          </div>
        </div> : <div className="p-4 h-full">
          <div className="flex items-center gap-4 mb-6">
            <Button onClick={() => setOpen(!isOpen)} variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5 text-black" />
            </Button>
            <div className="flex items-center gap-2">
              <Image className="w-5 h-5 text-[#FF1B8D]" />
              <h1 className="text-xl font-semibold text-black">Create your AI Dapps</h1>
            </div>
          </div>

          <div className="max-w-full mx-auto text-center mb-12 relative">
            <div className="w-20 h-20 rounded-2xl mx-auto mb-4">
              <img src="/logo-v.png" alt="logo" className="w-full h-full" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-black">Vivix AI</h2>
            <p className="text-gray-600 mb-8">
              Describe your AI Dapp here, and we'll bring it to life!
            </p>

            {history.length == 0 && <div className="flex flex-wrap gap-4 mb-8">
              <SuggestionCard
                icon={<Image />}
                text="Create a memecoin landing page with Pepe related"
              />
              <SuggestionCard
                icon={<Gamepad2 />}
                text="Create a Pac-man game"
              />
              <SuggestionCard
                icon={<Cloud />}
                text="Create a Weather App with clean, modern design"
              />
              <SuggestionCard
                icon={<BarChart3 />}
                text="Create a moon phase BTC price tracker"
              />
              <SuggestionCard
                icon={<BarChart3 />}
                text="Create a Crypto Profit/Loss Tracker"
              />
            </div>}

            {history.length !== 0 && <div className="mb-48">
              {history.map((item, index) => (
                <div key={index} className={`flex items-center gap-3 ${item.role != "user" ? "justify-start" : "justify-end"} gap-4 mb-4`}>
                  {item.role != "user" && <div className={`w-10 h-10 rounded-lg flex-shrink-0`}>
                    <img src="/logo-v.png" alt="logo" className="w-full h-full" />
                  </div>}
                  <div className="flex flex-col">
                    {item.isLoading && <p className={`p-4 bg-[#FF1B8D]/10 rounded-xl text-black animate-pulse`}>Loading...</p>}
                    {!item.isLoading && item.parts?.map((part, index) => (
                      <p key={index} className={`p-4 bg-[#FF1B8D]/10 rounded-xl text-black ${item.role != "user" ? 'text-start' : 'text-end'}`}>
                        {part.text}
                      </p>
                    ))}
                  </div>
                  {item.role == "user" && <div className={`w-10 h-10 bg-[#FF1B8D] rounded-lg flex-shrink-0`}></div>}
                </div>
              ))}
            </div>}

            <div className={`mt-8 p-6 bg-white rounded-xl border-2 border-[#FF1B8D]/20 fixed bottom-4 ${isOpen ? "w-[calc(100%-34rem)]" : "w-[calc(100%-23rem)]"} mx-auto transition-all duration-300`}>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex-shrink-0">
                  <img src="/logo-v.png" alt="logo" className="w-full h-full" />
                </div>
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Describe your AI idea here, and let's make it real with Vivix-powered GPT!"
                  className="flex-1 bg-transparent outline-none text-black"
                />
              </div>
              <div className="flex justify-between items-center">
                <Button variant="outline" className="text-[#FF1B8D]">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Custom Feature
                </Button>
                <Button onClick={() => {
                  const storage = typeof window !== 'undefined' ? window.localStorage : null;
                  const username = storage?.getItem('username');
                  if (!username) return toast.error("Please sign in to continue");
                  sendMessage();
                }} size="icon" className="bg-[#FF1B8D] hover:bg-[#FF1B8D]/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>}
      </main>
    </div>
  )
}