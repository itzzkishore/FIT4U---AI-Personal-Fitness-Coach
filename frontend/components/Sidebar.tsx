"use client";

import { MessageSquare, User, Dumbbell, LineChart, Target, Settings, Plus } from "lucide-react";

export default function Sidebar() {
    const menuItems = [
        { icon: <MessageSquare size={20} />, label: "Chat Coach", active: true },
        { icon: <Dumbbell size={20} />, label: "Workout Plans" },
        { icon: <LineChart size={20} />, label: "Progress Tracker" },
        { icon: <Target size={20} />, label: "Fitness Tips" },
        { icon: <User size={20} />, label: "My Profile" },
        { icon: <Settings size={20} />, label: "Settings" },
    ];

    return (
        <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-full text-gray-300">
            <div className="p-4 border-b border-gray-800">
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="bg-emerald-500 text-white rounded p-1"><Dumbbell size={18} /></span>
                    FIT4U Coach
                </h1>
            </div>

            <div className="p-4">
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-md py-2 px-4 flex items-center justify-center gap-2 transition-colors mb-4 text-sm font-medium">
                    <Plus size={18} /> New Chat
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 space-y-1">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        className={`w-full flex items-center gap-3 px-3 py-3 text-sm rounded-md transition-colors ${item.active
                                ? "bg-gray-800 text-white"
                                : "hover:bg-gray-800/50 hover:text-white"
                            }`}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold text-white uppercase">
                        U
                    </div>
                    <div className="text-sm font-medium">Free User</div>
                </div>
            </div>
        </aside>
    );
}
