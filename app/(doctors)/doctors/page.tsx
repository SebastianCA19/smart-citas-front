"use client";

import { motion } from "framer-motion";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center select-none">

      {/* Emoji */}
      <img src="https://iam-weijie.github.io/wave/hand-emoji.svg" alt="Animated Emoji" width="70" height="70"/>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-semibold text-gray-800"
      >
        Bienvenido a{" "}
        <span className="font-bold bg-linear-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent hover:cursor-pointer transition-all hover:scale-105">Smart Citas</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-gray-500 mt-3 text-lg"
      >
        Empecemos a trabajar
      </motion.p>

      {/* Decorative Element */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "120px", opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="h-1 bg-blue-600 rounded-full mt-6"
      />

    </div>
  );
}
