"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Wallet, Shield, BarChart3, Globe, ChevronRight, Star, ArrowRight, Menu, X } from "lucide-react"

export default function WelcomePage() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Features data
  const features = [
    {
      title: "Secure Wallet",
      description:
        "Military-grade encryption keeps your assets safe with multi-factor authentication and biometric security.",
      icon: <Shield className="w-10 h-10 text-purple-300" />,
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Real-time Analytics",
      description: "Track your portfolio performance with advanced charts and predictive analytics powered by AI.",
      icon: <BarChart3 className="w-10 h-10 text-blue-300" />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Global Transactions",
      description: "Send and receive crypto instantly worldwide with minimal fees and maximum transparency.",
      icon: <Globe className="w-10 h-10 text-emerald-300" />,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Multi-Currency Support",
      description: "Manage Bitcoin, Ethereum, and over 300 other cryptocurrencies all in one place.",
      icon: <Wallet className="w-10 h-10 text-amber-300" />,
      color: "from-amber-500 to-orange-600",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Crypto Investor",
      content: "Nova has transformed how I manage my digital assets. The security features give me peace of mind.",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Sarah Chen",
      role: "Day Trader",
      content: "The real-time analytics and alerts have helped me make better trading decisions. Highly recommended!",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Michael Rodriguez",
      role: "Tech Entrepreneur",
      content: "I've tried many crypto wallets, but Nova's UX and feature set are unmatched in the industry.",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const navVariants = {
    transparent: {
      backgroundColor: "rgba(15, 23, 42, 0)",
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    },
    solid: {
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
  }

  const particleVariants = {
    animate: (i: number) => ({
      y: [0, -30, 0],
      x: [0, i % 2 === 0 ? 10 : -10, 0],
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.2, 1],
      transition: {
        duration: 5 + i,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    }),
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
        variants={navVariants}
        animate={isScrolled ? "solid" : "transparent"}
        initial="transparent"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-blue-200">
              Nova
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-slate-200 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-slate-200 hover:text-white transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-slate-200 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/signin">
              <Button variant="ghost" className="text-slate-200 hover:text-white hover:bg-slate-800">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 mt-4 rounded-lg overflow-hidden"
            >
              <div className="flex flex-col p-4 space-y-4">
                <Link
                  href="#features"
                  className="text-slate-200 hover:text-white transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#testimonials"
                  className="text-slate-200 hover:text-white transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </Link>
                <Link
                  href="#pricing"
                  className="text-slate-200 hover:text-white transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-200 hover:text-white hover:bg-slate-800"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={particleVariants}
              animate="animate"
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${
                  Math.random() * 200 + 55
                }, ${Math.random() * 0.3 + 0.1})`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center md:text-left"
            >
              <motion.div
                variants={itemVariants}
                className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-violet-900/30 to-blue-900/30 border border-violet-700/20"
              >
                <span className="text-sm font-medium text-violet-200">The Future of Crypto Management</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-purple-200 to-blue-200">
                  Your Crypto Journey Starts Here
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg mx-auto md:mx-0"
              >
                Experience the next generation of cryptocurrency management with Nova's secure, intuitive, and powerful
                wallet platform.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-medium px-8 w-full sm:w-auto"
                  >
                    Create Your Wallet
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-700 text-slate-200 hover:bg-slate-800 w-full sm:w-auto"
                  >
                    Explore Features
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex items-center justify-center md:justify-start space-x-1 text-sm text-slate-400"
              >
                <Shield className="h-4 w-4 text-green-400" />
                <span>Bank-level security</span>
                <span className="mx-2">•</span>
                <Star className="h-4 w-4 text-amber-400" />
                <span>4.9/5 rating</span>
                <span className="mx-2">•</span>
                <Globe className="h-4 w-4 text-blue-400" />
                <span>1M+ users</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
             

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-violet-900 to-indigo-900 rounded-lg p-4 shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Portfolio Value</p>
                    <p className="text-lg font-bold text-white">$24,631.05</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-900 to-cyan-900 rounded-lg p-4 shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Security Status</p>
                    <p className="text-sm font-medium text-white">Advanced Protection</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-blue-200"
            >
              Powerful Features for Modern Crypto Users
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-slate-300 max-w-2xl mx-auto"
            >
              Nova combines cutting-edge security with an intuitive interface to give you the best crypto management
              experience.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-1"
            >
              <div className="relative bg-slate-900 rounded-xl overflow-hidden p-6">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-blue-500" />

                <div className="flex space-x-4 mb-6">
                  {features.map((feature, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeFeature === index
                          ? `bg-gradient-to-r ${feature.color} text-white`
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {feature.title.split(" ")[0]}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[300px]"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${features[activeFeature].color} bg-opacity-10`}
                      >
                        {features[activeFeature].icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{features[activeFeature].title}</h3>
                        <p className="text-slate-300">{features[activeFeature].description}</p>
                      </div>
                    </div>

                    <div className="mt-8 bg-slate-800/50 rounded-lg p-6">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt={`${features[activeFeature].title} illustration`}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.5 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl transition-all cursor-pointer ${
                      activeFeature === index
                        ? `bg-gradient-to-r ${feature.color} bg-opacity-10 border border-${feature.color.split("-")[1]}-500/20`
                        : "bg-slate-900/50 hover:bg-slate-800/50"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} bg-opacity-20`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-slate-300">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-blue-200"
            >
              Trusted by Crypto Enthusiasts Worldwide
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-slate-300 max-w-2xl mx-auto"
            >
              Join thousands of satisfied users who have transformed their crypto experience with Nova.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-slate-300 mb-6">"{testimonial.content}"</p>
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium text-white">{testimonial.name}</h4>
                        <p className="text-sm text-slate-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <Card className="border-none overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-indigo-900 to-blue-900" />

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                  <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-purple-500 opacity-20 blur-xl" />
                  <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-500 opacity-20 blur-xl" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-violet-500 opacity-10 blur-3xl" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center p-12 py-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white max-w-2xl">
                    Ready to Take Control of Your Crypto Assets?
                  </h2>

                  <p className="text-lg text-slate-200 max-w-xl mb-8">
                    Join Nova today and experience the future of cryptocurrency management with our secure, intuitive
                    platform.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/signup">
                      <Button size="lg" className="bg-white text-indigo-900 hover:bg-slate-100 font-medium px-8">
                        Get Started for Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Contact Sales
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-blue-200">
                Nova
              </span>
            </div>

            <div className="text-slate-400 text-sm">© {new Date().getFullYear()} Nova Wallet. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
