import React, { useState, useEffect, useRef } from 'react';

const CIPHER_CHARS = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]_";

/**
 * Cipher Reveal Text Component
 * Rapidly scrambles characters and resolves to the target text like decrypted data.
 */
export function CipherReveal({
  text,
  className = "",
  speed = 30,
  triggerOnHover = true,
  autoStart = true
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef(null);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration) {
              return text[index];
            }
            return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setIsScrambling(false);
      }

      iteration += 1 / 2;
    }, speed);
  };

  useEffect(() => {
    if (autoStart) {
      startScramble();
    }
    return () => clearInterval(intervalRef.current);
  }, [text, autoStart]);

  return (
    <span
      className={`font-mono inline-block cursor-default transition-colors ${className}`}
      onMouseEnter={() => {
        if (triggerOnHover) startScramble();
      }}
    >
      {displayText}
    </span>
  );
}

/**
 * Ghost Scroll Text Reveal
 * As the user scrolls down, words emerge from a faint "ghost" opacity (0.15)
 * into solid, high-contrast visibility.
 */
export function GhostScrollText({
  text,
  className = "",
  highlightColor = "#C8FF3D"
}) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const start = windowHeight * 0.85;
            const end = windowHeight * 0.25;
            const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
            setScrollProgress(progress);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const words = text.split(" ");
  const totalWords = words.length;

  return (
    <p ref={containerRef} className={`leading-relaxed select-none ${className}`}>
      {words.map((word, i) => {
        const wordThreshold = i / totalWords;
        const isRevealed = scrollProgress >= wordThreshold;
        const isCurrent = Math.abs(scrollProgress - wordThreshold) < 0.05;

        return (
          <span
            key={i}
            className="inline-block transition-all duration-300 mr-[0.28em]"
            style={{
              opacity: isRevealed ? 1 : 0.18,
              transform: isRevealed ? "translateY(0)" : "translateY(4px)",
              color: isCurrent ? highlightColor : isRevealed ? "#171714" : "#77766F"
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}
