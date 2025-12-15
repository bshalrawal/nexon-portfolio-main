'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquareText, X, Send, Loader2, Bot, Sparkles, RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
    role: 'user' | 'model';
    content: string;
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(true);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', content: 'Hi there! I\'m your Nexon AI assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-hide popup after 10 seconds if not interacted with
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Only send actual conversation messages (skip index 0 greeting)
            // We slice from 1 because index 0 is always the welcome message
            const apiMessages = messages.slice(1).concat(userMessage);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: apiMessages.length > 0 ? apiMessages : [userMessage]
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                // Check if the error is JSON
                try {
                    const errorJson = JSON.parse(errorText);
                    console.error('API Error JSON:', errorJson);
                    throw new Error(errorJson.details || errorJson.error || 'Unknown API Error');
                } catch (e) {
                    console.error('API Error Text:', errorText);
                    throw new Error(`API error: ${response.status} - ${errorText}`);
                }
            }

            const data = await response.json();
            const botMessage: Message = { role: 'model', content: data.response };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error: any) {
            console.error('Error sending message:', error);
            setMessages((prev) => [
                ...prev,
                { role: 'model', content: error.message || 'Sorry, I encountered an error. Please try again later.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setShowPopup(false);
    };

    const resetChat = () => {
        setMessages([
            { role: 'model', content: 'Hi! What can I help you with?' }
        ]);
        setInput('');
        setIsLoading(false);
    };

    return (
        <>
            {/* Popup Bubble */}
            <div
                className={cn(
                    "fixed bottom-40 right-28 z-[90] transition-all duration-500 transform",
                    showPopup && !isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
                )}
            >
                <div className="relative bg-white text-gray-900 px-5 py-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 max-w-[260px] cursor-pointer" onClick={toggleChat}>
                    <div className="flex items-start gap-4">
                        <div className="relative shrink-0 mt-1">
                            <Bot className="w-8 h-8 text-primary" />
                            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border border-white"></span>
                            </span>
                        </div>
                        <div>
                            <p className="font-semibold text-sm mb-1">Have any queries?</p>
                            <p className="text-xs text-gray-500 leading-snug">Chat with Nexon AI for instant answers!</p>
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowPopup(false);
                        }}
                        className="absolute -top-2 -left-2 bg-white text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full p-1 shadow-sm border border-gray-100 transition-colors"
                    >
                        <X className="w-3 h-3" />
                    </button>

                    {/* Arrow/Tail pointing right */}
                    <div className="absolute top-1/2 -right-2 w-4 h-4 bg-white transform -translate-y-1/2 rotate-45 border-t border-r border-gray-100"></div>
                </div>
            </div>

            <Button
                onClick={toggleChat}
                className={cn(
                    "fixed bottom-40 right-6 z-[100] rounded-full h-16 w-16 shadow-2xl transition-all duration-300 hover:scale-110",
                    isOpen ? "bg-red-500 hover:bg-red-600 rotate-90" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                )}
                size="icon"
            >
                {isOpen ? (
                    <X className="h-8 w-8 text-white" />
                ) : (
                    <div className="relative">
                        <MessageSquareText className="h-8 w-8 text-white" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                    </div>
                )}
            </Button>

            {isOpen && (
                <Card className="fixed bottom-24 right-4 sm:right-6 w-[350px] sm:w-[400px] h-[550px] shadow-2xl z-[100] flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 border-none rounded-2xl overflow-hidden bg-white">
                    <CardHeader className="p-4 border-b border-gray-100 bg-white">
                        <CardTitle className="flex items-center justify-between text-lg font-medium text-black">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/logo.png"
                                    alt="Nexon Inc"
                                    width={32}
                                    height={32}
                                    className="h-8 w-auto object-contain"
                                />
                                <span className="font-semibold text-base">Nexon Inc</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-500 hover:text-black hover:bg-gray-100 rounded-full h-8 w-8"
                                    onClick={resetChat}
                                    title="Reset Chat"
                                >
                                    <RefreshCcw className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-500 hover:text-black hover:bg-gray-100 rounded-full h-8 w-8"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="h-5 w-5" />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden bg-white">
                        <ScrollArea className="h-full p-4">
                            <div className="flex flex-col gap-6">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "flex flex-col gap-2 max-w-[85%]",
                                            message.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                                        )}
                                    >
                                        {message.role === 'model' && (
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="bg-blue-100 p-1 rounded-full">
                                                    <Bot className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <span className="text-sm font-semibold text-black">Nexon Inc</span>
                                            </div>
                                        )}

                                        <div
                                            className={cn(
                                                "px-4 py-3 text-sm shadow-sm",
                                                message.role === 'user'
                                                    ? "bg-black text-white rounded-2xl rounded-tr-none" // User bubble: Black
                                                    : "bg-[#f3f4f6] text-gray-800 rounded-2xl rounded-tl-none" // Bot bubble: Light grey
                                            )}
                                        >
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex flex-col gap-2 max-w-[85%] mr-auto items-start">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="bg-blue-100 p-1 rounded-full">
                                                <Bot className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <span className="text-sm font-semibold text-black">Nexon Inc</span>
                                        </div>
                                        <div className="bg-[#f3f4f6] text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-3 border-t bg-background">
                        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                            <Input
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                                className="flex-1 bg-white border-gray-200 focus-visible:ring-black rounded-full"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading || !input.trim()}
                                className="bg-black hover:bg-gray-800 text-white shadow-sm rounded-full w-10 h-10"
                            >
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </>
    );
}
