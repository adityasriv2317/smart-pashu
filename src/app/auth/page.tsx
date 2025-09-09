"use client";
import React from "react";
import { Sprout, ArrowRight, UserPlus, LogIn } from "lucide-react";

// Floating label input component
interface FloatingLabelInputProps {
  id: string;
  label: string;
  type: string;
  required?: boolean;
}

function FloatingLabelInput({
  id,
  label,
  type,
  required = false,
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
    <div className="relative mb-2">
      <input
        id={id}
        type={type}
        className="w-full px-4 py-4 pt-6 rounded-lg border border-green-100 bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-700 text-base peer shadow-sm"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        required={required}
      />
      <label
        htmlFor={id}
        className={`absolute text-sm left-4 px-2 bg-white transition-all duration-200 ${
          isFocused || hasValue
            ? "transform -translate-y-2.5 text-green-700 text-xs"
            : "transform translate-y-5 text-neutral-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default function AuthPage() {
  const [activeTab, setActiveTab] = React.useState<"login" | "register">(
    "login"
  );
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-50 font-sans">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-green-100 bg-white/80 backdrop-blur-sm select-none shadow-sm">
        <div className="flex items-center gap-2">
          <Sprout className="w-8 h-8 text-green-700" />
          <span className="text-xl font-bold tracking-tight text-neutral-900">
            Smart Pashu
          </span>
        </div>
      </header>

      {/* Auth Tabs */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center gap-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100">
          <div className="flex justify-center mb-8 select-none">
            <button
              className={`flex-1 px-4 py-2.5 rounded-l-lg font-medium text-base transition-colors ${
                activeTab === "login"
                  ? "bg-green-700 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
              onClick={() => setActiveTab("login")}
              type="button"
            >
              <LogIn className="inline w-4 h-4 mr-2 mb-0.5" /> Login
            </button>
            <button
              className={`flex-1 px-4 py-2.5 rounded-r-lg font-medium text-base transition-colors ${
                activeTab === "register"
                  ? "bg-green-700 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
              onClick={() => setActiveTab("register")}
              type="button"
            >
              <UserPlus className="inline w-4 h-4 mr-2 mb-0.5" /> Register
            </button>
          </div>
          {activeTab === "login" ? (
            <form className="flex flex-col gap-5">
              <FloatingLabelInput
                id="login-email"
                label="Email"
                type="email"
                required
              />
              <FloatingLabelInput
                id="login-password"
                label="Password"
                type="password"
                required
              />

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
                <a href="#" className="text-sm text-green-700 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold shadow-md hover:from-green-700 hover:to-green-800 transition-colors text-base mt-2"
              >
                Login <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-5">
              <FloatingLabelInput
                id="register-name"
                label="Full Name"
                type="text"
                required
              />
              <FloatingLabelInput
                id="register-email"
                label="Email"
                type="email"
                required
              />
              <FloatingLabelInput
                id="register-password"
                label="Password"
                type="password"
                required
              />

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

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold shadow-md hover:from-green-700 hover:to-green-800 transition-colors text-base mt-2"
              >
                Register <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-green-100 bg-white/80 backdrop-blur-sm py-6 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500 mt-auto select-none shadow-sm">
        <span className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} Smart Pashu. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
