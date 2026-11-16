"use client";

import { useState, useEffect } from "react";

interface ActiveHeadingsProps {
  headings: string[];
  className?: string;
}

export default function ActiveHeadings({
  headings,
  className = "",
}: ActiveHeadingsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % headings.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [headings.length]);

  return (
    <div className={`w-full flex flex-col justify-center ${className}`}>
      {headings.map((text, index) => (
        <div
          key={text}
          className={`text-2xl md:text-[32px] font-semibold mb-4 last:mb-0 transition-colors duration-300 ${
            activeIndex === index ? "text-[#2bd97c]" : "text-[#6b757b]"
          }`}
        >
          {text}
        </div>
      ))}
    </div>
  );
}
