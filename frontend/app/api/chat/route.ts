import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize SDK
// Note: In Next.js App Router, env variables are automatically loaded.
const ai = new GoogleGenAI({});

const COACH_SYSTEM_INSTRUCTION = `
You are FIT4U Coach, an AI-powered fitness personal coach.
You must:
- Analyze user data and provide personalized workout/nutrition advice.
- Be friendly, motivating, supportive, and knowledgeable.
- Use Markdown for easy reading (bullet points, bold text).
- Avoid unsafe workout advice and warn users with medical conditions or injuries to seek professional help.
- Explain exercises step-by-step if asked.
- Answer all health and fitness questions.
Keep responses concise but highly actionable.
`;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message, history, userProfile } = body;

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // Build context prompt
        const contextPrompt = `UserProfile context: 
    Age: ${userProfile?.age || 'Unknown'}
    Fitness Level: ${userProfile?.fitnessLevel || 'Unknown'}
    Goal: ${userProfile?.goal || 'General Fitness'}
    Equipment: ${userProfile?.equipment || 'None'}
    Injuries: ${userProfile?.injuries || 'None'}
    `;

        // Add conversation history into context
        const messagesPayload: any[] = [
            { role: "system", parts: [{ text: COACH_SYSTEM_INSTRUCTION + "\n\n" + contextPrompt }] },
        ];

        if (history && Array.isArray(history)) {
            history.forEach(m => {
                messagesPayload.push({
                    role: m.role === 'ai' ? 'model' : 'user',
                    parts: [{ text: m.content }]
                });
            });
        }

        messagesPayload.push({ role: "user", parts: [{ text: message }] });

        // Generate content using Gemini
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: messagesPayload
        });

        return NextResponse.json({ reply: response.text });

    } catch (error) {
        console.error('Error hitting Gemini API:', error);
        return NextResponse.json({ error: 'Failed to communicate with AI Coach' }, { status: 500 });
    }
}
