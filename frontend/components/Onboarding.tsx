"use client";

import { useState } from "react";
import { Dumbbell, ArrowRight } from "lucide-react";
import { ProfileData } from "@/app/page";

export default function Onboarding({ onComplete }: { onComplete: (data: ProfileData) => void }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        fitnessLevel: "Beginner",
        goal: "General Fitness",
        equipment: "None",
        injuries: "None"
    });

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else onComplete(formData);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="bg-emerald-500 p-3 rounded-full mb-4">
                        <Dumbbell size={32} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">Welcome to FIT4U</h1>
                    <p className="text-gray-400 mt-2">Let's build your personalized AI Coach profile</p>
                </div>

                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">What is your Name?</label>
                            <input
                                type="text"
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium mb-1">Age</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none"
                                    value={formData.age}
                                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium mb-1">Gender</label>
                                <select
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none"
                                    value={formData.gender}
                                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 flex flex-col gap-2">
                        <label className="block text-sm font-medium">What is your Fitness Level?</label>
                        {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                            <button
                                key={lvl}
                                onClick={() => setFormData({ ...formData, fitnessLevel: lvl })}
                                className={`w-full text-left px-4 py-3 rounded-lg border \${formData.fitnessLevel === lvl ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-700 bg-gray-900'}`}
                            >
                                {lvl}
                            </button>
                        ))}
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 flex flex-col gap-2">
                        <label className="block text-sm font-medium">What is your main goal?</label>
                        {['Fat Loss', 'Muscle Gain', 'Strength', 'Endurance', 'General Fitness'].map(goal => (
                            <button
                                key={goal}
                                onClick={() => setFormData({ ...formData, goal: goal })}
                                className={`w-full text-left px-4 py-3 rounded-lg border \${formData.goal === goal ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-700 bg-gray-900'}`}
                            >
                                {goal}
                            </button>
                        ))}
                    </div>
                )}

                <div className="mt-8 flex justify-between items-center">
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-2 w-2 rounded-full \${i <= step ? 'bg-emerald-500' : 'bg-gray-700'}`} />
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors font-medium"
                    >
                        {step === 3 ? "Start Coaching" : "Next"} <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
