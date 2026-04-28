// src/hooks/useIntersectionObserver.js
import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, isVisible] — triggers once when element enters viewport.
 * @param {number} threshold – 0–1, how much of element must be visible
 * @param {string} rootMargin – CSS margin for observer root
 */
export function useIntersectionObserver(threshold = 0.15, rootMargin = "0px") {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
