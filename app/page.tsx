"use client"

import { FloatingElements } from "@/components/landing/FloatingElements"
import { InteractiveCard } from "@/components/landing/InteractiveCard"
import { ArrowRight, Shield, Sparkles, TrendingUp, Users, Zap } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Floating Elements */}
      <FloatingElements />
      
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Wonder
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex space-x-4"
        >
          <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/signup" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
            Get Started
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Revolutionary Lead Management</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Transform
            </span>
            <br />
            <span className="text-white">Your Business</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Streamline your lead management with AI-powered insights, automated workflows, 
            and real-time analytics. Convert prospects into customers faster than ever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-lg flex items-center space-x-2 hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/20 rounded-full text-white font-semibold text-lg backdrop-blur-md hover:bg-white/10 transition-all duration-300"
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Wonder?</h2>
            <p className="text-xl text-gray-300">Powerful features designed for modern businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Process leads in seconds with our optimized workflow engine",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Enterprise-grade security with 99.9% uptime guarantee",
                color: "from-green-500 to-blue-500"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together seamlessly with real-time updates",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <InteractiveCard key={index} delay={index * 0.2}>
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </InteractiveCard>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "10K+", label: "Active Users", icon: Users },
              { number: "99.9%", label: "Uptime", icon: Shield },
              { number: "50%", label: "Faster Conversion", icon: TrendingUp }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">Join thousands of businesses already using Wonder</p>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                Start Your Free Trial
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Wonder
            </span>
          </div>
          <p className="text-gray-400">© 2024 Wonder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
