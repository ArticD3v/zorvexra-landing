"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroHighlight, Highlight } from "./hero-highlight";
import quotesData from "@/data/quotes.json";

export const QuoteDisplay = ({ disableBackground = false }: { disableBackground?: boolean }) => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prev) => (prev + 1) % quotesData.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // Ensure index is valid
    const safeIndex = currentQuoteIndex % quotesData.length;
    const quote = quotesData[safeIndex];

    const Content = (
        <AnimatePresence mode="wait">
            <motion.div
                key={safeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl px-4 text-center"
            >
                <h2 className="text-2xl font-bold text-white md:text-4xl lg:text-5xl leading-relaxed lg:leading-snug font-open-sans-custom mb-6">
                    <Highlight className="text-white">
                        "{quote.text}"
                    </Highlight>
                </h2>
                <p className="text-lg text-gray-400 font-open-sans-custom italic">
                    — {quote.author}
                </p>
            </motion.div>
        </AnimatePresence>
    );

    if (disableBackground) {
        return <div className="h-full w-full flex items-center justify-center">{Content}</div>;
    }

    return (
        <HeroHighlight containerClassName="h-full w-full bg-transparent">
            {Content}
        </HeroHighlight>
    );
};
