"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface StarConfig {
    id: number;
    size: number;
    top: number;
    left: number;
    blur: number;
    delay: number;
    duration: number;
}

const StarField: React.FC<{ count?: number }> = ({ count = 150 }) => {
    const stars = useMemo<StarConfig[]>(() => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            size: Math.random() * 2 + 0.5,
            top: Math.random() * 100,
            left: Math.random() * 100,
            blur: Math.random() * 1.5,
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 3,
        }));
    }, [count]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {stars.map((s) => (
                <span
                    key={s.id}
                    className="absolute bg-white rounded-full animate-pulse"
                    style={{
                        top: `${s.top}%`,
                        left: `${s.left}%`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        filter: `blur(${s.blur}px)`,
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${s.duration}s`,
                    }}
                />
            ))}
        </div>
    );
};

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-gray-700 py-4">
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left flex justify-between items-center text-lg font-semibold transition-colors duration-300 hover:text-blue-400"
            >
                {q}
                <span className="ml-4 text-xl">{open ? "−" : "+"}</span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-gray-300"
                    >
                        {a}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

const NasaSpaceAppsFaq: React.FC = () => {
    const faqs = [
        {
            q: "What is NASA Space Apps Challenge 2025?",
            a: "The NASA International Space Apps Challenge is the world’s largest annual hackathon engaging thousands of participants to solve global challenges with NASA’s open data.",
        },
        {
            q: "Where is the Jabalpur event happening?",
            a: "NASA Space Apps Jabalpur 2025 is a hybrid event – you can join virtually or attend in person at our designated Jabalpur venue.",
        },
        {
            q: "Who can participate?",
            a: "Students, professionals, and space enthusiasts from all disciplines are welcome!",
        },
        {
            q: "How do I register?",
            a: "Registration details are available on the official NASA Space Apps website and local Jabalpur organizers’ channels.",
        },
        {
            q: "Is prior coding experience required?",
            a: "No! Teams can include participants of all skill levels. Creativity and teamwork are key.",
        },
        {
            q: "Are there any prizes?",
            a: "Yes, participants may receive global recognition, awards, and mentorship opportunities from NASA and partner organizations.",
        },
        {
            q: "Can I join remotely?",
            a: "Absolutely! This hybrid event allows remote participation via online platforms.",
        },
    ];

    return (
        <section className="relative w-full min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
            {/* Background Image */}
                <Image
                    src="/faq-hero.png"
                    alt="NASA Space Apps Hero"
                    fill
                    className="object-cover opacity-70"
                />
            {/* Stars */}
            <StarField count={150} />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto w-full px-6 sm:px-12">
                <motion.h2
                    className="text-4xl sm:text-5xl font-bold mb-8 pt-28 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    FAQ
                </motion.h2>

                <div className="bg-gray-900 bg-opacity-80 rounded-3xl p-8 shadow-xl space-y-4">
                    {faqs.map((f, i) => (
                        <FAQItem key={i} q={f.q} a={f.a} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NasaSpaceAppsFaq;
