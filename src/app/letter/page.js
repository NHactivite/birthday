"use client"

import { usePlay } from "@/context/play";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Letter = () => {
  const [emojiStyles, setEmojiStyles] = useState([]);
  const {setPlay}=usePlay()
  
  
  const router=useRouter();
  const move=()=>{
    setPlay(true)
    router.push('/morom');
  }
  useEffect(() => {
    setEmojiStyles(
      Array.from({ length: 10 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
        fontSize: `${Math.max(20, Math.random() * 40)}px`,
        emoji: [
           "💖", "💝", "💕", "🌸", "🌹", "💐", "✨"
        ][Math.floor(Math.random() * 14)],
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

    return () => {clearInterval(interval)
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-500 overflow-hidden relative">
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

      {/* Animated Text */}
    <div className="flex flex-col items-center lg:m-32 h-screen">
    <motion.div
  className="text-4xl mt-10 text-center font-semibold text-pink-700 p-6 leading-relaxed"
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.2 } }, // Each word appears one by one
  }}
>
  {["May", "all", "your", "dreams", "and", "wishes", "come", "true", "this", "year,", "bringing", "you", "fulfillment", "and", "happiness.✨"].map(
    (word, index) => (
      <motion.span
        key={index}
        className="inline-block mr-1" // Adds spacing between words
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        whileHover={{ scale: 1.2, y: -3, transition: { duration: 0.2 } }} // Cute bounce on hover
      >
        {/* {`${word}${"  "}`} */}
        {word}
      </motion.span>
    )
  )}
</motion.div>

     <motion.p
          className="text-center font-semibold text-pink-700 p-6 mt-40 flex items-center animate-small-pulse"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        >
          akhn tumaloi 💖 click this
          <img
            src="valentines-day-valentine.gif"
            className="w-10 h-10 "
            alt="Valentine"
            onClick={move}
          />
        </motion.p>
    </div>
      
    </div>
  );
};

export default Letter;