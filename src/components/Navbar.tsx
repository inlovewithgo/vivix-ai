"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [isScrolling, setIsScrolling] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                setIsScrolling(true);
            } else {
                setIsScrolling(false);
            }
        });
    }, []);
    return (
        <nav className={`${isScrolling ? "bg-white/70 sticky" : "bg-white text-black"} py-4 px-6`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/" className="text-black font-bold text-xl flex items-center">
                        <img src="/logo.png" alt="ChatFlow" className="w-full h-10 mr-2" />
                    </Link>
                </div>
                <div className="hidden md:flex space-x-6 ml-auto">
                    <Link href="/" className="text-black hover:text-gray-600">Home</Link>
                    <Link href="/pricing" className="text-black hover:text-gray-600">Pricing</Link>
                    <Link href="/blog" className="text-black hover:text-gray-600">Blog</Link>
                    <Link href="/knowledge-base" className="text-black hover:text-gray-600">Knowledge Base</Link>
                    <Link href="/login" className="text-black hover:text-gray-600">Login</Link>
                </div>
                <Button className="bg-green-500 hover:bg-green-600 text-white ml-6 rounded-full">Get Started</Button>
            </div>
        </nav>
    )
}

