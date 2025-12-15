'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-40 right-6 z-50">
      <Button
        onClick={scrollToTop}
        className={cn(
          'p-3 bg-secondary/50 text-secondary-foreground backdrop-blur-sm border border-secondary-foreground/20 shadow-lg rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-8 w-8" />
      </Button>
    </div>
  );
}
