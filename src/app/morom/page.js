"use client";

import { usePlay } from "@/context/play";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Morom = () => {
  const [emojiStyles, setEmojiStyles] = useState([]);
  const [audio, setAudio] = useState(null);
  const {play} = usePlay();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setEmojiStyles(
      Array.from({ length: 50 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
        fontSize: `${Math.max(20, Math.random() * 40)}px`,
        emoji: ["🎈", "🎉", "💖", "💝", "💕", "🌸", "🌹", "💐", "✨", "🌟"][
          Math.floor(Math.random() * 10)
        ],
      }))
    );

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    const newAudio = new Audio("/nikhil.mp3"); // Ensure file is in the 'public' folder
    newAudio.currentTime = 117; // Start at 1:57
    setAudio(newAudio);
    const timerId = setTimeout(() => {
      setShowText(true);
    }, 10 * 1000); 
    
    return () => {
      clearInterval(interval);
      clearTimeout(timerId);
      if (newAudio) {
        newAudio.pause();
        newAudio.currentTime = 0;
      }
    };
  }, []);
   
    if (audio && play) {
      audio.play().catch((err) => console.log("Play failed:", err));
    
  };

  return (
    <div className="min-h-screen bg-[rgb(244,196,132)] overflow-hidden relative">
      {/* Floating Emojis */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {emojiStyles.map((style, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: style.left,
              top: style.top,
              animationDelay: style.animationDelay,
              animationDuration: style.animationDuration,
              fontSize: style.fontSize,
            }}
          >
            {style.emoji}
          </div>
        ))}
      </div>
      <motion.div
        className="text-center mt-44 flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1.3 }}
        transition={{ duration: 0.8 }}
      >
        <img src="puuung-kiss-puuung.gif" />
        {
          showText?<motion.p
          className=" text-3xl text-center font-semibold text-pink-700 p-6 mt-40 flex items-center animate-small-pulse absolute"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        >
          I Love You 💖
        </motion.p>:null
        }
      </motion.div>
    </div>
  );
};

export default Morom;
