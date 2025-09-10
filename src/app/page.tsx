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
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl"; // Import useTranslations

import Footer from "@/components/Footer";

export default function Home() {
  const t = useTranslations("home"); // Initialize the hook with the namespace
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/dashboard";
    }
  }, [status]);

  useEffect(() => {
    const token =
      sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleLanguageChange = () => {
    const currentLocale =
      typeof window !== "undefined"
        ? localStorage.getItem("locale") || "en"
        : "en";
    const newLocale = currentLocale === "en" ? "hi" : "en";
    localStorage.setItem("locale", newLocale);
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-neutral-200 select-none">
        <div className="flex items-center gap-2">
          {/* <Sprout className="w-8 h-8 text-green-700" /> */}
          <Image
            src="/Pashu.png"
            alt="Smart Pashu Logo"
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-neutral-900">
            {t("header.title")}
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm text-neutral-700 select-none">
          <a
            href="#features"
            className="hover:text-green-700 transition-colors"
          >
            {t("header.features")}
          </a>
          <a href="#gallery" className="hover:text-green-700 transition-colors">
            {t("header.gallery")}
          </a>
          <a href="#contact" className="hover:text-green-700 transition-colors">
            {t("header.contact")}
          </a>
        </nav>
        <span className="flex gap-4">
          {/* Language Switcher */}
          <button
            onClick={handleLanguageChange}
            className="px-4 py-2 rounded-full bg-green-700 text-white font-medium shadow hover:bg-green-800 transition-colors"
          >
            {t("changeLanguage")}
          </button>
          <a
            href="/auth"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-700 text-white font-medium shadow hover:bg-green-800 transition-colors"
          >
            {t("header.getStarted")} <ArrowRight className="w-4 h-4" />
          </a>
        </span>
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
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight select-none">
            {t("hero.title")}
          </h1>
          <p className="max-w-xl mx-auto text-lg select-none text-neutral-600 mb-6">
            {t("hero.description")}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/auth"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition-colors text-base"
          >
            {t("hero.webAppButton")} <Laptop className="w-5 h-5" />
          </a>
          <a
            href="#get-app"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-green-700 text-green-700 font-semibold hover:bg-green-50 transition-colors text-base"
          >
            {t("hero.mobileAppButton")} <Smartphone className="w-5 h-5" />
          </a>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section
        id="features"
        className="w-full max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 select-none"
      >
        <motion.div
          whileHover={{ y: -4, scale: 1.03 }}
          className="bg-neutral-50 rounded-xl p-6 flex flex-col items-center shadow-sm border border-neutral-100"
        >
          <LucideImage className="w-8 h-8 text-green-700 text-center mb-2" />
          <h3 className="font-semibold text-lg mb-1 text-neutral-900">
            {t("features.aiPrediction.title")}
          </h3>
          <p className="text-neutral-600 text-sm text-center">
            {t("features.aiPrediction.description")}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -4, scale: 1.03 }}
          className="bg-neutral-50 rounded-xl p-6 flex flex-col items-center shadow-sm border border-neutral-100"
        >
          <UserCheck className="w-8 h-8 text-green-700 mb-2" />
          <h3 className="font-semibold text-lg mb-1 text-center text-neutral-900">
            {t("features.manualOverrides.title")}
          </h3>
          <p className="text-neutral-600 text-sm text-center">
            {t("features.manualOverrides.description")}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -4, scale: 1.03 }}
          className="bg-neutral-50 rounded-xl p-6 flex flex-col items-center shadow-sm border border-neutral-100"
        >
          <BookOpen className="w-8 h-8 text-green-700 mb-2" />
          <h3 className="font-semibold text-lg mb-1 text-center text-neutral-900">
            {t("features.breedInfo.title")}
          </h3>
          <p className="text-neutral-600 text-sm text-center">
            {t("features.breedInfo.description")}
          </p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="w-full max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center select-none">
          {t("gallery.title")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <motion.div
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="aspect-square rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center"
          >
            <img
              src="/c1.jpg"
              alt={t("gallery.altBreed1")}
              className="object-cover w-full h-full"
            />
          </motion.div>
          <motion.div
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="aspect-square rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center"
          >
            <img
              src="/c2.jpg"
              alt={t("gallery.altBreed2")}
              className="object-cover w-full h-full"
            />
          </motion.div>
          <motion.div
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="aspect-square rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center"
          >
            <img
              src="/c3.jpg"
              alt={t("gallery.altBreed3")}
              className="object-cover w-full h-full"
            />
          </motion.div>
          <motion.div
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="aspect-square rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center"
          >
            <img
              src="/c4.webp"
              alt={t("gallery.altBreed4")}
              className="object-cover w-full h-full"
            />
          </motion.div>
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
            {t("cta.title")}
          </h2>
          <p className="text-neutral-600 mb-6">{t("cta.description")}</p>
          <div className="flex gap-4 items-center justify-around sm:justify-center">
            <a
              href="/auth"
              className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded-full bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition-colors text-base"
            >
              {t("cta.signInWeb")} <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#get-app"
              className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded-full border border-green-700 text-green-700 font-semibold hover:bg-green-50 transition-colors text-base"
            >
              {t("cta.downloadApp")} <Smartphone className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
