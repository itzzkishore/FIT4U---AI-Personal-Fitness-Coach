"use client";

import { Dumbbell, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";

type Message = {
    role: 'user' | 'ai';
    content: string;
};

export default function ChatArea({ messages, isTyping }: { messages: Message[], isTyping?: boolean }) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    return (
        <div className="w-full h-full overflow-y-auto pt-8 pb-32 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 md:gap-6 \${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'ai' && (
                            <div className="w-10 h-10 rounded-full bg-emerald-600 flex-shrink-0 flex items-center justify-center text-white mt-1">
                                <Dumbbell size={20} />
                            </div>
                        )}

                        <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 \${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none' 
                : 'bg-gray-800 border border-gray-700 text-gray-100 rounded-bl-none prose prose-invert prose-emerald'
            }`}>
                            {msg.role === 'ai' ? (
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            ) : (
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                            )}
                        </div>

                        {msg.role === 'user' && (
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-white mt-1">
                                <User size={20} />
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-4 md:gap-6 justify-start">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 flex-shrink-0 flex items-center justify-center text-white mt-1">
                            <Dumbbell size={20} />
                        </div>
                        <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-none px-5 py-4 w-24">
                            <div className="flex gap-1 items-center justify-center h-full">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={bottomRef} className="h-4" />
            </div>
        </div>
    );
}
