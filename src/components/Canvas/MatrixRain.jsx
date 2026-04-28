// src/components/Canvas/MatrixRain.jsx
// Full-screen canvas background: falling binary & hex strings (Matrix rain)
import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const FONT_SIZE = 14;
    let cols, drops, hexDrops;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / FONT_SIZE);
      drops     = Array.from({ length: cols }, () => Math.random() * -100);
      hexDrops  = Array.from({ length: Math.floor(cols / 6) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.5,
        str: generateHex(),
        alpha: 0.03 + Math.random() * 0.03,
      }));
    }

    function generateHex() {
      return "0x" + Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, "0");
    }

    resize();
    window.addEventListener("resize", resize);

    let raf;
    let lastTime = 0;
    const FPS = 18;
    const interval = 1000 / FPS;

    function draw(timestamp) {
      raf = requestAnimationFrame(draw);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      // Dim previous frame (trail effect)
      ctx.fillStyle = "rgba(2, 12, 2, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;

      // Binary rain columns
      for (let i = 0; i < drops.length; i++) {
        const char = Math.random() > 0.5 ? "1" : "0";
        const y = drops[i] * FONT_SIZE;
        const x = i * FONT_SIZE;

        // Head character brighter
        if (drops[i] > 0) {
          ctx.fillStyle = `rgba(0, 255, 65, ${drops[i] < 2 ? 0.55 : 0.04 + Math.random() * 0.03})`;
          ctx.fillText(char, x, y);
        }

        // Reset drop when it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }

      // Hex strings drifting
      ctx.font = `11px "JetBrains Mono", monospace`;
      for (const hd of hexDrops) {
        ctx.fillStyle = `rgba(0, 212, 255, ${hd.alpha})`;
        ctx.fillText(hd.str, hd.x, hd.y);
        hd.y += hd.speed;
        if (hd.y > canvas.height + 20) {
          hd.y = -20;
          hd.x = Math.random() * canvas.width;
          hd.str = generateHex();
        }
      }
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
