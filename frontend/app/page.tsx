"use client";

import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import ChatInput from "@/components/ChatInput";
import Onboarding from "@/components/Onboarding";
import { useState } from "react";

export type ProfileData = {
    age?: string;
    gender?: string;
    fitnessLevel?: string;
    goal?: string;
    equipment?: string;
} | null;

export default function Home() {
    const [profile, setProfile] = useState<ProfileData>(null);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
        { role: 'ai', content: "Hi! I am FIT4U Coach. I'm ready to help you hit your fitness goals! What would you like to focus on today?" }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = async (msg: string) => {
        // Add user message
        const newMessages = [...messages, { role: 'user' as const, content: msg }];
        setMessages(newMessages);
        setIsTyping(true);

        try {
            // In a real environment, this hits http://localhost:5000/api/chat
            // Now calling the integrated Next.js API route suitable for Vercel
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 'local-user',
                    message: msg,
                    history: newMessages,
                    userProfile: profile
                })
            });

            let aiText = "Simulation error: API request failed.";

            if (response.ok) {
                const data = await response.json();
                aiText = data.reply;
            }

            setMessages(prev => [...prev, { role: 'ai', content: aiText }]);
        } catch (e) {
            // Network fail means API route errors or missing keys
            setMessages(prev => [...prev, { role: 'ai', content: "Error connecting to the API. Make sure GEMINI_API_KEY is set in your Vercel or local environment." }]);
        } finally {
            setIsTyping(false);
        }
    };

    // Show onboarding if no profile exists
    if (!profile) {
        return <Onboarding onComplete={setProfile} />;
    }

    return (
        <main className="flex h-screen w-full bg-gray-900 overflow-hidden">
            {/* Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main Chat Interface */}
            <div className="flex-1 flex flex-col h-full bg-gray-800">
                <header className="md:hidden p-4 border-b border-gray-700 bg-gray-900 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-white">FIT4U Coach</h1>
                </header>

                <div className="flex-1 overflow-hidden relative">
                    <ChatArea messages={messages} isTyping={isTyping} />
                </div>

                <ChatInput onSendMessage={handleSendMessage} />
            </div>
        </main>
    );
}
