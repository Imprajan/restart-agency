import React, { useState, useEffect } from 'react';

/**
 * GhostTypewriter Component
 * Types out phrases with a smooth ghost blur-in fade and blinking accent cursor.
 * Automatically cycles through phrases with natural typing and backspacing cadence.
 */
export default function GhostTypewriter({
  words,
  phrases,
  typeSpeed = 65,
  deleteSpeed = 35,
  delayBetween = 2200,
  className = "",
  cursorClassName = "text-[#6AFBC0]",
}) {
  const list = phrases || words || [
    "High-Retention Video Editing",
    "Cinematic AI Commercials",
    "Viral Shorts & Reels",
    "3D Motion Graphics",
    "High-CTR Visual Packaging"
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGhostGlitch, setIsGhostGlitch] = useState(false);

  useEffect(() => {
    const fullWord = list[currentWordIndex % list.length];

    let timer;

    if (!isDeleting) {
      // Typing forward
      if (currentText.length < fullWord.length) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length + 1));
        }, typeSpeed + (Math.random() * 20 - 10));
      } else {
        // Finished typing word, wait before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetween);
      }
    } else {
      // Backspacing
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length - 1));
        }, deleteSpeed);
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % list.length);
        setIsGhostGlitch(true);
        setTimeout(() => setIsGhostGlitch(false), 200);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, list, typeSpeed, deleteSpeed, delayBetween]);

  return (
    <span className={`inline-flex items-center font-sora ${className}`}>
      <span
        className={`transition-all duration-150 ${
          isGhostGlitch ? 'opacity-40 blur-[2px]' : 'opacity-100 blur-0'
        }`}
        style={{ textShadow: '0 0 12px rgba(106, 251, 192, 0.25)' }}
      >
        {currentText}
      </span>
      {/* Blinking Ghost Cursor */}
      <span
        aria-hidden="true"
        className={`inline-block ml-1 font-bold animate-pulse ${cursorClassName}`}
      >
        |
      </span>
    </span>
  );
}
