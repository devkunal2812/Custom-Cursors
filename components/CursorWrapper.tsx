'use client';

import { useEffect, useRef } from 'react';
import { CURSORS } from '@/data/cursors';
import type { CursorHandlers } from '@/types/cursor';

interface CursorWrapperProps {
  activeCursor: string;
}

export default function CursorWrapper({ activeCursor }: CursorWrapperProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const handlersRef = useRef<CursorHandlers | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;

    const cursor = CURSORS.find(c => c.id === activeCursor);
    if (!cursor) return;

    // Clear previous cursor safely
    const wrap = wrapRef.current;
    while (wrap.firstChild) {
      wrap.removeChild(wrap.firstChild);
    }

    // Initialize new cursor
    const handlers = cursor.init(wrap);
    handlersRef.current = handlers;

    // Attach hover handlers to interactive elements
    const interactables = document.querySelectorAll(
      'a, button, .cursor-card, .demo-btn, .demo-card-el, .demo-link'
    );

    const handleEnter = () => {
      if (handlersRef.current?.enter) {
        handlersRef.current.enter();
      }
    };

    const handleLeave = () => {
      if (handlersRef.current?.leave) {
        handlersRef.current.leave();
      }
    };

    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      // Clean up event listeners
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
      
      // Clear cursor elements safely on unmount
      while (wrap.firstChild) {
        wrap.removeChild(wrap.firstChild);
      }
    };
  }, [activeCursor]);

  return <div ref={wrapRef} id="c-wrap" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }} />;
}
