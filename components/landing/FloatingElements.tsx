"use client"

import { Sparkles, Star, Zap } from "lucide-react"
import { motion } from "motion/react"

export function FloatingElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-purple-400/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sparkles size={16 + Math.random() * 8} />
        </motion.div>
      ))}

      {/* Floating stars */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-yellow-400/20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star size={12 + Math.random() * 6} />
        </motion.div>
      ))}

      {/* Floating zaps */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`zap-${i}`}
          className="absolute text-blue-400/25"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Zap size={14 + Math.random() * 6} />
        </motion.div>
      ))}
    </div>
  )
} 