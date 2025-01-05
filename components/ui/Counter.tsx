"use client";
import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const Counter = ({
  target,
  suffix,
  isRating,
}: {
  target: number;
  suffix: string;
  isRating: boolean;
}) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, {
    margin: "-100px",
    once: false,
  });

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    const duration = 2000;
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
  }, [target, isInView]);
  return (
    <div ref={counterRef} className='flex items-baseline justify-center gap-1'>
      <span className='text-4xl font-bold text-white'>
        {isRating ? count.toFixed(1) : Math.round(count).toLocaleString()}
      </span>
      <span className='text-xl text-gray-300'>{suffix}</span>
    </div>
  );
};
