"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [emojiStyles, setEmojiStyles] = useState([]);

  useEffect(() => {
    let intervalId;

    // Show toast after 3 seconds
    let toastTimer = setTimeout(() => {
      toast.success("Click on the bear! 🐻💖");
      // Start repeating toast every 5 seconds
      intervalId = setInterval(() => {
        toast.success("Click on the bear! 🐻💖");
      }, 5000);
    }, 3000);

    // Generate styles once when component mounts
    setEmojiStyles(
      Array.from({ length: 30 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
        fontSize: `${Math.max(20, Math.random() * 40)}px`,
        emoji: ["🎂", "🎁", "🎈", "🎉", "🥳", "💖", "💝", "💕", "🌸", "🌹", "💐", "✨", "🌟", "🍰"][
          Math.floor(Math.random() * 14)
        ],
      }))
    );

    // Cleanup function to clear timers on unmount
    return () => {
      clearTimeout(toastTimer);
      clearInterval(intervalId);
    };
  }, []);

  const greeting = () => {
    router.push("/greet");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 to-yellow-100 overflow-hidden">
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

      {/* Clickable Bear */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img
          onClick={greeting}
          className="w-44 h-44 animate-scale-pulse"
          src="/dudu-cute.gif"
        />
      </div>
    </div>
  );
}
