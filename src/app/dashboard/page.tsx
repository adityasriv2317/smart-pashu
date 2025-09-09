"use client";
import { Sprout, UserCheck, BookOpen, LogOut } from "lucide-react";

export default function Dashboard() {
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
        <div className="flex gap-4">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-700 text-white font-medium shadow hover:bg-green-800 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center gap-8">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight select-none">
          Welcome to your Dashboard
        </h1>
        <p className="max-w-xl mx-auto text-lg text-neutral-600 mb-6">
          Here you can view your activity, manage animal registrations, and
          access breed resources.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="bg-neutral-50 rounded-xl p-6 flex flex-col items-center shadow-sm border border-neutral-100 select-none">
            <UserCheck className="w-8 h-8 text-green-700 mb-2" />
            <span className="font-semibold text-lg text-neutral-900 mb-1">
              Registered Animals
            </span>
            <span className="text-2xl font-bold text-green-700">24</span>
          </div>
          <div className="bg-neutral-50 rounded-xl p-6 flex flex-col items-center shadow-sm border border-neutral-100 select-none">
            <BookOpen className="w-8 h-8 text-green-700 mb-2" />
            <span className="font-semibold text-lg text-neutral-900 mb-1">
              Breed Info Accessed
            </span>
            <span className="text-2xl font-bold text-green-700">12</span>
          </div>
          <div className="bg-neutral-50 rounded-xl p-6 flex flex-col items-center shadow-sm border border-neutral-100 select-none">
            <Sprout className="w-8 h-8 text-green-700 mb-2" />
            <span className="font-semibold text-lg text-neutral-900 mb-1">
              AI Predictions
            </span>
            <span className="text-2xl font-bold text-green-700">37</span>
          </div>
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
