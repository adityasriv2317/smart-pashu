"use client";
import { motion } from "framer-motion";
import {
  Sprout,
  Smartphone,
  Image as LucideImage,
  UserCheck,
  Laptop,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <Sprout className="w-8 h-8 text-green-700" />
          <span className="text-xl font-bold tracking-tight text-neutral-900">
            Smart Pashu
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm text-neutral-700">
          <a
            href="#features"
            className="hover:text-green-700 transition-colors"
          >
            Features
          </a>
          <a href="#gallery" className="hover:text-green-700 transition-colors">
            Gallery
          </a>
          <a href="#contact" className="hover:text-green-700 transition-colors">
            Contact
          </a>
        </nav>
        <a
          href="#get-started"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-700 text-white font-medium shadow hover:bg-green-800 transition-colors"
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </a>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center gap-8"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight">
            Image-based Cattle & Buffalo Breed Identification
          </h1>
          <p className="max-w-xl mx-auto text-lg text-neutral-600 mb-6">
            Empowering Field Level Workers (FLWs) to register animals with
            AI-driven breed suggestions. Seamless integration with Bharat
            Pashudhan App (BPA) for accurate, validated records.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition-colors text-base"
          >
            Try Web App <Laptop className="w-5 h-5" />
          </a>
          <a
            href="#get-app"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-green-700 text-green-700 font-semibold hover:bg-green-50 transition-colors text-base"
          >
            Get Mobile App <Smartphone className="w-5 h-5" />
          </a>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section
        id="features"
        className="w-full max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <motion.div
          whileHover={{ y: -4, scale: 1.03 }}
          className="bg-neutral-50 rounded-xl p-6 flex flex-col items-center shadow-sm border border-neutral-100"
        >
          <LucideImage className="w-8 h-8 text-green-700 text-center mb-2" />
          <h3 className="font-semibold text-lg mb-1 text-neutral-900">
            AI Prediction
          </h3>
          <p className="text-neutral-600 text-sm text-center">
            Upload cattle/buffalo images and get instant AI-driven breed
            suggestions with confidence scores.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -4, scale: 1.03 }}
          className="bg-neutral-50 rounded-xl p-6 flex flex-col items-center shadow-sm border border-neutral-100"
        >
          <UserCheck className="w-8 h-8 text-green-700 mb-2" />
          <h3 className="font-semibold text-lg mb-1 text-center text-neutral-900">
            Manual Overrides
          </h3>
          <p className="text-neutral-600 text-sm text-center">
            FLWs can override AI suggestions and submit final breed data
            directly to BPA for validated records.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -4, scale: 1.03 }}
          className="bg-neutral-50 rounded-xl p-6 flex flex-col items-center shadow-sm border border-neutral-100"
        >
          <BookOpen className="w-8 h-8 text-green-700 mb-2" />
          <h3 className="font-semibold text-lg mb-1 text-center text-neutral-900">
            Breed Info & Gallery
          </h3>
          <p className="text-neutral-600 text-sm text-center">
            Access breed galleries, descriptions, and resources for quick field
            reference and learning.
          </p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="w-full max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
          Breed Gallery
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Example images, replace with real breed images */}
          <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center">
            <Image
              src="/file.svg"
              alt="Breed 1"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center">
            <Image
              src="/globe.svg"
              alt="Breed 2"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center">
            <Image
              src="/window.svg"
              alt="Breed 3"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center">
            <Image
              src="/vercel.svg"
              alt="Breed 4"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        id="get-started"
        className="w-full max-w-3xl mx-auto px-6 py-12 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-neutral-600 mb-6">
            Sign in to the web app or download the mobile app to begin
            registering animals with AI-powered breed identification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition-colors text-base"
            >
              Sign In (Web) <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#get-app"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-green-700 text-green-700 font-semibold hover:bg-green-50 transition-colors text-base"
            >
              Download App <Smartphone className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-200 py-6 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500 mt-auto">
        <span>
          &copy; {new Date().getFullYear()} Smart Pashu. All rights reserved.
        </span>
        <div className="flex gap-4">
          <a href="#contact" className="hover:underline">
            Contact
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
