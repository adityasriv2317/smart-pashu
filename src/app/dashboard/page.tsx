"use client";
import { Sprout, UserCheck, BookOpen, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <motion.div
      className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-50 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.header
        className="w-full flex items-center justify-between px-6 py-4 border-b border-green-100 bg-white/80 backdrop-blur-sm select-none shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Sprout className="w-8 h-8 text-green-700" />
          <span className="text-xl font-bold tracking-tight text-neutral-900">
            Smart Pashu
          </span>
        </motion.div>
        <div className="flex gap-4">
          <motion.button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-medium shadow-md hover:from-green-700 hover:to-green-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              localStorage.removeItem("authToken");
              sessionStorage.removeItem("authToken");
              window.location.href = "/auth";
            }}
          >
            <LogOut className="w-4 h-4" /> Logout
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center gap-8">
        <motion.h1
          className="text-3xl sm:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Welcome to your Dashboard
        </motion.h1>
        <motion.p
          className="max-w-xl mx-auto text-lg text-neutral-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Here you can view your activity, manage animal registrations, and
          access breed resources.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center shadow-md border border-green-100 select-none"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <UserCheck className="w-8 h-8 text-green-700 mb-2" />
            <span className="font-semibold text-lg text-neutral-900 mb-1">
              Registered Animals
            </span>
            <span className="text-2xl font-bold text-green-700">24</span>
          </motion.div>
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center shadow-md border border-green-100 select-none"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <BookOpen className="w-8 h-8 text-green-700 mb-2" />
            <span className="font-semibold text-lg text-neutral-900 mb-1">
              Breed Info Accessed
            </span>
            <span className="text-2xl font-bold text-green-700">12</span>
          </motion.div>
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center shadow-md border border-green-100 select-none"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Sprout className="w-8 h-8 text-green-700 mb-2" />
            <span className="font-semibold text-lg text-neutral-900 mb-1">
              AI Predictions
            </span>
            <span className="text-2xl font-bold text-green-700">37</span>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        className="w-full border-t border-green-100 bg-white/80 backdrop-blur-sm py-6 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500 mt-auto select-none shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <span className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} Smart Pashu. All rights reserved.
        </span>
      </motion.footer>
    </motion.div>
  );
}
