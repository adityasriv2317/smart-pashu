"use client";
import { Sprout, UserCheck, BookOpen, LogOut, Loader } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      window.alert("Please select a file to upload.");
      return;
    }
    setUploading(true);
    setUploadResult(null);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const url = process.env.NEXT_PUBLIC_ML_API;

      console.log("ML API URL:", url);

      const response = await axios.post(`${url}/predict/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadResult(response.data || "Upload successful!");
    } catch (error: any) {
      setUploadResult(error.response?.data || "Upload failed.");
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
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center gap-8 w-full">
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
          Here you can upload animal images for AI breed prediction and manage
          your activity.
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
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
          {uploadResult && (
            <div className="text-green-700 font-medium mt-2">
              {uploadResult}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
