// import Link from "next/link";
// import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="py-4 px-2 sm:px-8 flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-6 bg-gradient-to-b from-white to-green-900/20 text-gray-300 border-t border-green-500 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 w-full md:w-auto text-center md:text-left">
        <a
          href="https://smart-pashu.vercel.app/"
          className="font-bold text-green-600 hover:underline text-lg md:text-lg"
        >
          Smart-Pashu
        </a>
        <span className="hidden sm:inline font-bold text-gray-500">|</span>
        <div className="text-xs text-gray-900 sm:text-right w-full sm:w-auto mt-1 sm:mt-0">
          © {new Date().getFullYear()} FourAM.
        </div>
      </div>

      <div className="flex flex-row text-gray-900 items-center gap-3">
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-xs sm:text-base"
        >
          Built with NEXT JS
        </a>
        <span className="text-gray-500">&amp;</span>
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-xs sm:text-base"
        >
          Tailwind CSS
        </a>
      </div>
    </motion.footer>
  );
}
