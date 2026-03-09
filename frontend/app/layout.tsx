import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'FIT4U - AI Personal Fitness Coach',
    description: 'Your intelligent personal fitness coach that interacts through a ChatGPT-style interface.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} min-h-screen antialiased bg-gray-900 text-gray-50 flex overflow-hidden`}>
                {children}
            </body>
        </html>
    );
}
