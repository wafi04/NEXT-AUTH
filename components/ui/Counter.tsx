"use client"
import { useEffect, useState } from "react";

export const Counter = ({ target, suffix, isRating }: { target: number; suffix: string; isRating: boolean }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      if (!isVisible) return;
  
      let start = 0;
      const duration = 2000; // 2 seconds duration
      const startTime = Date.now();
  
      const timer = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
  
        const currentCount = progress * target;
        setCount(currentCount);
  
        if (progress === 1) {
          clearInterval(timer);
        }
      }, 20);
  
      return () => clearInterval(timer);
    }, [target, isVisible]);
  
    useEffect(() => {
      setIsVisible(true);
    }, []);
  
    return (
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl font-bold text-white">
          {isRating ? count.toFixed(1) : Math.round(count).toLocaleString()}
        </span>
        <span className="text-xl text-gray-300">{suffix}</span>
      </div>
    );
  };
  