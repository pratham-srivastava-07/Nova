"use client"

import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
// import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Menu, Wallet, X } from "lucide-react";

export default function Navbar() {
  // const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


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
  );
}