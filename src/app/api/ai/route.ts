import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const genAI = new GoogleGenerativeAI("AIzaSyBj9-rceg-xemUSBkPH616_5QZNpRYnQ2I");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const body = await req.json();

        const userMessage = body.message.toLowerCase();
        
        if (userMessage.includes("what's your name") || userMessage.includes("who are you")) {
            return NextResponse.json({
                text: "My name is Vivix. I am a Crypto AI Bot designed to help with cryptocurrency insights, news, market analysis, and trading strategies.",
                aiName: "Vivix",
                description: "Vivix is an advanced Crypto AI Bot designed to provide intelligent insights and responses in the cryptocurrency space."
            });
        }

        const chat = model.startChat({
            history: body.history,
            generationConfig: {
                maxOutputTokens: 525
            },
        });

        let result = await chat.sendMessage(body.message);

        return NextResponse.json({
            text: result.response.text(),
            aiName: "Vivix",
            description: "Vivix is an advanced Crypto AI Bot designed to provide intelligent insights and responses in the cryptocurrency space."
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 400 });
    }
}
