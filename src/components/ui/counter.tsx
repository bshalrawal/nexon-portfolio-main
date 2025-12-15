"use client";

import { useEffect, useState } from 'react';

interface CounterProps {
  from?: number;
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export const Counter = ({ from = 0, value, suffix, className, duration = 1000 }: CounterProps) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (from) {
      start = from;
    }
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    const timer = setInterval(() => {
      current += increment;
      setCount(current);
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, from, duration]);

  return (
    <p className={className}>
      {count}
      {suffix}
    </p>
  );
};
