"use client"

import { motion } from "motion/react"
import { ReactNode } from "react"

interface InteractiveCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function InteractiveCard({ children, className = "", delay = 0 }: InteractiveCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={`group relative p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 ${className}`}
    >
      {/* Shiny border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
    </motion.div>
  )
} 