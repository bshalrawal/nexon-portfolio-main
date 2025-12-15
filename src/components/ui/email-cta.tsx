'use client';

import { Mail } from 'lucide-react';

export function EmailCTA() {
  return (
    <a
      href="mailto:info@nexoninc.tech"
      className="fixed bottom-24 right-6 z-50 p-3 bg-primary rounded-full shadow-lg hover:bg-primary/80 transition-colors duration-300"
      aria-label="Send an Email"
    >
      <Mail className="h-8 w-8 text-primary-foreground" />
    </a>
  );
}
