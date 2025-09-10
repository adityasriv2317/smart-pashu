"use client";
import { Sprout, UserCheck, BookOpen, LogOut, Loader } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl"; 
import Image from "next/image";
import Chatbot from "@/components/Chatbot";

export default function Dashboard() {
  const t = useTranslations("dashboard"); // Initialize the dashboard namespace
  const tHome = useTranslations("home");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any | null>(null); // Changed to 'any' to handle JSON object

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleLanguageChange = () => {
    const currentLocale =
      typeof window !== "undefined"
        ? localStorage.getItem("locale") || "en"
        : "en";
    const newLocale = currentLocale === "en" ? "hi" : "en";
    localStorage.setItem("locale", newLocale);
    window.location.reload();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      window.alert(t("notifications.selectFile")); // Use translation
      return;
    }
    setUploading(true);
    setUploadResult(null);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const url = process.env.NEXT_PUBLIC_ML_API;
      const response = await axios.post(`${url}/predict/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("API Response:", response.data);

      setUploadResult(
        response.data || { message: t("notifications.uploadSuccess") }
      );
    } catch (error: any) {
      setUploadResult({
        message:
          error.response?.data?.detail || t("notifications.uploadFailed"),
      });
    } finally {
      setUploading(false);
    }
  };

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
        </motion.div>
        <div className="flex gap-4">
          <button
            onClick={handleLanguageChange}
            className="px-4 py-2 rounded-full cursor-pointer bg-green-700 text-white font-medium shadow hover:bg-green-800 transition-colors"
          >
            {tHome("changeLanguage")}
          </button>
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
            <LogOut className="w-4 h-4" /> {t("header.logoutButton")}
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-flex-start px-6 py-16 text-center gap-8 w-full">
        <motion.h1
          className="text-3xl sm:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t("main.title")}
        </motion.h1>
        <motion.p
          className="max-w-xl mx-auto text-lg text-neutral-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {t("main.description")}
        </motion.p>
        <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="px-6 py-2 rounded-full bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading && <Loader className="w-5 h-5 animate-spin" />}
            {uploading ? t("main.uploadingButton") : t("main.uploadButton")}
          </button>

          {/* Enhanced display for upload result object */}
          {uploadResult && (
            <div className="text-left w-full bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
              <h3 className="font-bold text-lg text-green-800">
                Prediction Result:
              </h3>
              {uploadResult.prediction && (
                <p className="text-neutral-700">
                  <strong>Breed:</strong> {uploadResult.prediction}
                </p>
              )}
              {uploadResult.confidence && (
                <p className="text-neutral-700">
                  <strong>Confidence:</strong>{" "}
                  {(uploadResult.confidence * 100).toFixed(2)}%
                </p>
              )}
              {uploadResult.message && (
                <p className="text-red-600">
                  <strong>Status:</strong> {uploadResult.message}
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      <Chatbot />

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
