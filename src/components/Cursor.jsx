// src/components/Cursor.jsx
// Custom terminal block cursor + trail particles
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hover targets
    const interactiveSelector = "a, button, input, textarea, [role='button'], .btn-terminal";

    let mx = -100, my = -100;

    function moveCursor(e) {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top  = my + "px";

      // Spawn trail particle
      spawnTrail(mx, my);
    }

    function onMouseOver(e) {
      const target = e.target.closest(interactiveSelector);
      if (target) {
        cursor.classList.add("crosshair");
        cursor.textContent = "⊕";
      }
    }

    function onMouseOut(e) {
      const target = e.target.closest(interactiveSelector);
      if (target) {
        cursor.classList.remove("crosshair");
        cursor.textContent = "";
      }
    }

    function spawnTrail(x, y) {
      const dot = document.createElement("div");
      dot.className = "cursor-trail";
      dot.style.left = x + "px";
      dot.style.top  = y + "px";
      dot.style.zIndex = "99997";
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 500);
    }

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout",  onMouseOut);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout",  onMouseOut);
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      ref={cursorRef}
      aria-hidden="true"
      style={{ position: "fixed", pointerEvents: "none", zIndex: 99999 }}
    />
  );
}
