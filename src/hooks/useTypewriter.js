// src/hooks/useTypewriter.js
import { useState, useEffect, useRef } from "react";

/**
 * Types text character by character.
 * Uses a ref-based approach to avoid stale closure infinite loops.
 */
export function useTypewriter(text = "", speed = 40, active = true, startDelay = 0) {
  const [displayed, setDisplayed] = useState("");
  const timerRef = useRef(null);
  const delayRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    clearTimeout(timerRef.current);
    clearTimeout(delayRef.current);

    let index = 0;

    const tick = () => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index < text.length) {
        timerRef.current = setTimeout(tick, speed);
      }
    };

    const initialDelay = startDelay > 0 ? startDelay : speed;
    delayRef.current = setTimeout(() => {
      setDisplayed("");
      tick();
    }, initialDelay);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(delayRef.current);
    };
  }, [text, active, speed, startDelay]);

  return displayed;
}

/**
 * Cycles through multiple texts with typing + deleting animation.
 * Runs once on mount; texts are accessed via ref to avoid stale closures.
 */
export function useCyclingTypewriter(texts = [], speed = 80, pause = 2200) {
  const [displayed, setDisplayed] = useState("");
  const timerRef  = useRef(null);
  const textsRef  = useRef(texts);
  const stateRef  = useRef({ textIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    textsRef.current = texts;
    clearTimeout(timerRef.current);
    stateRef.current = { textIdx: 0, charIdx: 0, deleting: false };

    if (!texts.length) return;

    function tick() {
      const { textIdx, charIdx, deleting } = stateRef.current;
      const arr     = textsRef.current;
      if (!arr.length) return;
      const current = arr[textIdx] || "";

      if (!deleting && charIdx <= current.length) {
        setDisplayed(current.slice(0, charIdx));
        stateRef.current.charIdx += 1;
        timerRef.current = setTimeout(tick, speed);
      } else if (!deleting) {
        stateRef.current.deleting = true;
        timerRef.current = setTimeout(tick, pause);
      } else if (deleting && charIdx > 0) {
        stateRef.current.charIdx -= 1;
        setDisplayed(current.slice(0, stateRef.current.charIdx));
        timerRef.current = setTimeout(tick, speed / 2);
      } else {
        stateRef.current.deleting = false;
        stateRef.current.textIdx  = (textIdx + 1) % Math.max(arr.length, 1);
        stateRef.current.charIdx  = 0;
        timerRef.current = setTimeout(tick, 0);
      }
    }

    const startId = window.setTimeout(() => {
      setDisplayed("");
      timerRef.current = setTimeout(tick, speed);
    }, 0);
    return () => {
      clearTimeout(startId);
      clearTimeout(timerRef.current);
    };
  }, [texts, speed, pause]);

  return displayed;
}
