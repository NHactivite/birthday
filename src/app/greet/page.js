"use client"
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation';
const Greet= () => {
  const [emojiStyles, setEmojiStyles] = useState([]);
   const router = useRouter();
  useEffect(()=>{
    setEmojiStyles(
      Array.from({ length: 15 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
        fontSize: `${Math.max(20, Math.random() * 40)}px`,
        emoji: [ "🎁", "🎈", "🎉", "💖", "💝", "💕", "🌸", "🌹", "💐", "✨", "🌟"][
          Math.floor(Math.random() * 14)
        ],
      }))
    );
  },[])

  const move=()=>{
    router.push('/letter');
  }
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 overflow-hidden ">
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
            className="text-center pt-20 pb-4 mt-44"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-6xl font-bold text-pink-600 mb-4">Happy Birthday Rituporna💐</h1>
            <p className="text-xl md:text-2xl mt-20 text-purple-700 ">check the letter 💖</p>
      </motion.div>
      <motion.div
            className="text-center flex justify-center items-center "
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img src='valentines-day-valentine.gif' onClick={move} className='w-40 h-40 z-50' />
      </motion.div>
  </div>
  )
}

export default Greet