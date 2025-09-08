"use client";
import React from "react";
import { Sprout, ArrowRight, UserPlus, LogIn } from "lucide-react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = React.useState<"login" | "register">(
    "login"
  );
  return (
  <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-neutral-200 select-none">
        <div className="flex items-center gap-2">
          <Sprout className="w-8 h-8 text-green-700" />
          <span className="text-xl font-bold tracking-tight text-neutral-900">
            Smart Pashu
          </span>
        </div>
      </header>

      {/* Auth Tabs */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center gap-8">
        <div className="w-full max-w-md bg-neutral-50 rounded-xl p-8 shadow-sm border border-neutral-100">
          <div className="flex justify-center mb-6 select-none">
            <button
              className={`flex-1 px-4 py-2 rounded-l-lg font-semibold text-base transition-colors ${
                activeTab === "login"
                  ? "bg-green-700 text-white"
                  : "bg-neutral-200 text-neutral-700"
              }`}
              onClick={() => setActiveTab("login")}
              type="button"
            >
              <LogIn className="inline w-4 h-4 mr-1 mb-0.5" /> Login
            </button>
            <button
              className={`flex-1 px-4 py-2 rounded-r-lg font-semibold text-base transition-colors ${
                activeTab === "register"
                  ? "bg-green-700 text-white"
                  : "bg-neutral-200 text-neutral-700"
              }`}
              onClick={() => setActiveTab("register")}
              type="button"
            >
              <UserPlus className="inline w-4 h-4 mr-1 mb-0.5" /> Register
            </button>
          </div>
          {activeTab === "login" ? (
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-green-700 text-base"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-green-700 text-base"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition-colors text-base mt-2"
              >
                Login <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-green-700 text-base"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-green-700 text-base"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-green-700 text-base"
                required
              />
              <select
                className="px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-green-700 text-base"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="flw">Field Level Worker</option>
                <option value="admin">Admin</option>
                <option value="vet">Veterinarian</option>
              </select>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition-colors text-base mt-2"
              >
                Register <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-200 py-6 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500 mt-auto select-none">
        <span>
          &copy; {new Date().getFullYear()} Smart Pashu. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
