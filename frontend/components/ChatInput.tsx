"use client";

import { Send, Mic } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ onSendMessage }: { onSendMessage: (msg: string) => void }) {
    const [input, setInput] = useState("");

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;
        onSendMessage(input);
        setInput("");
    };

    return (
        <div className="p-4 w-full bg-gray-900 border-t border-gray-800 pb-8 sm:pb-4">
            <div className="max-w-4xl mx-auto relative flex items-center">
                <form onSubmit={handleSend} className="w-full flex">
                    <input
                        type="text"
                        className="flex-1 bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 rounded-full py-3 pl-6 pr-14 focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
                        placeholder="Ask your coach anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute right-12 text-gray-400 hover:text-white p-2 transition-colors"
                    >
                        <Mic size={20} />
                    </button>
                    <button
                        type="submit"
                        className="absolute right-2 top-1 bottom-1 bg-emerald-600 hover:bg-emerald-500 rounded-full p-2 text-white transition-colors"
                        disabled={!input.trim()}
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
                FIT4U may display inaccurate information, including about medical conditions. Double-check responses.
            </p>
        </div>
    );
}
