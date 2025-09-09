"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Sprout, ArrowRight, UserPlus, LogIn, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Floating label input component
interface FloatingLabelInputProps {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  name?: string; // Added name prop
}

function FloatingLabelInput({
  id,
  label,
  type,
  required = false,
  name,
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value !== "");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value !== "");
  };

  return (
    <motion.div
      className="relative mb-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.input
        id={id}
        name={name}
        type={type}
        className="w-full px-4 py-4 pt-6 rounded-lg border text-gray-900 border-green-100 bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-700 text-base peer shadow-sm"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        required={required}
        whileFocus={{ scale: 1.01 }}
      />
      <motion.label
        htmlFor={id}
        className={`absolute text-md left-4 px-2 bg-white transition-all duration-300 ${
          isFocused || hasValue
            ? "transform -translate-y-2.5 text-green-700 text-xs"
            : "transform translate-y-5 text-neutral-500"
        }`}
      >
        {label}
      </motion.label>
    </motion.div>
  );
}

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token } = response.data;

      sessionStorage.setItem("authToken", token);
      window.location.href = "/dashboard";
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      const { token } = response.data;

      sessionStorage.setItem("authToken", token);
      window.location.href = "/dashboard";
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
    } finally {
      setIsLoading(false);
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
        className="w-full flex items-center justify-between px-6 py-4 border-b border-green-100 bg-white/80 backdrop-blur-sm shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.a
          href="/"
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Sprout className="w-8 h-8 text-green-700" />
          <span className="text-xl font-bold tracking-tight text-neutral-900">
            Smart Pashu
          </span>
        </motion.a>
        <motion.h2
          className="text-2xl font-bold absolute text-center w-full text-neutral-900 select-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {activeTab === "login" ? "Welcome Back" : "Create Account"}
        </motion.h2>
      </motion.header>

      {/* Auth Tabs */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center gap-4">
        <motion.div
          className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-center mb-8 select-none">
            <motion.button
              className={`flex-1 px-4 py-2.5 rounded-l-lg font-medium text-base transition-colors ${
                activeTab === "login"
                  ? "bg-green-700 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
              onClick={() => setActiveTab("login")}
              type="button"
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <LogIn className="inline w-4 h-4 mr-2 mb-0.5" /> Login
            </motion.button>
            <motion.button
              className={`flex-1 px-4 py-2.5 rounded-r-lg font-medium text-base transition-colors ${
                activeTab === "register"
                  ? "bg-green-700 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
              onClick={() => setActiveTab("register")}
              type="button"
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <UserPlus className="inline w-4 h-4 mr-2 mb-0.5" /> Register
            </motion.button>
          </div>
          <AnimatePresence mode="wait">
            {activeTab === "login" ? (
              <motion.form
                className="flex flex-col gap-5"
                key="login-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleLogin}
              >
                <FloatingLabelInput
                  id="login-email"
                  label="Email"
                  type="email"
                  required
                  name="email"
                />
                <FloatingLabelInput
                  id="login-password"
                  label="Password"
                  type="password"
                  required
                  name="password"
                />

                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}

                <div className="flex justify-between items-center mt-1 mb-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="mr-2 h-4 w-4 accent-green-700"
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-sm text-neutral-600"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-green-700 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <motion.button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold shadow-md hover:from-green-700 hover:to-green-800 transition-colors text-base mt-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 8 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Login <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                className="flex flex-col gap-5"
                key="register-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleRegister}
              >
                <FloatingLabelInput
                  id="register-name"
                  label="Full Name"
                  type="text"
                  required
                  name="name"
                />
                <FloatingLabelInput
                  id="register-email"
                  label="Email"
                  type="email"
                  required
                  name="email"
                />
                <FloatingLabelInput
                  id="register-password"
                  label="Password"
                  type="password"
                  required
                  name="password"
                />

                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}

                <div className="flex items-center mt-1 mb-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mr-2 h-4 w-4 accent-green-700"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-neutral-600">
                    I agree to the{" "}
                    <a href="#" className="text-green-700 hover:underline">
                      Terms of Service
                    </a>
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold shadow-md hover:from-green-700 hover:to-green-800 transition-colors text-base mt-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 8 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Register <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        className="w-full border-t border-green-100 bg-white/80 backdrop-blur-sm py-6 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500 mt-auto select-none shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <span className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} Smart Pashu. All rights reserved.
        </span>
      </motion.footer>
    </motion.div>
  );
}
