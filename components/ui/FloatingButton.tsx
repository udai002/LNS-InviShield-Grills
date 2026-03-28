"use client"

import React from "react"
import { motion } from "framer-motion"

interface IFloatingButton {
  title?: string
  icon?: React.ReactNode
  image?: string
  background?: string
  onClick?: () => void
  position?:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "bottom-right-12"
  theme?: "light" | "dark"
  pulse?: boolean // 🔥 new
}

const FloatingButton = ({
  background,
  icon,
  image,
  title,
  onClick,
  position = "bottom-right",
  theme = "light",
  pulse = false,
}: IFloatingButton) => {
  const positionClasses = {
    "bottom-right": "bottom-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "top-right": "top-8 right-8",
    "top-left": "top-8 left-8",
    "bottom-right-12": "bottom-32 right-12",
  }

  const themeClasses =
    theme === "dark"
      ? "bg-black text-white"
      : "bg-white text-black"

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.1,
        y: -3,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group fixed ${positionClasses[position]} p-4 flex items-center gap-2 rounded-full z-50 shadow-lg hover:shadow-2xl backdrop-blur-md ${themeClasses}`}
      style={{ backgroundColor: background }}
    >
      {/* Pulse Effect */}
      {pulse && (
        <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-30"></span>
      )}

      {/* Content */}
      {image && (
        <img
          src={image}
          alt={title || "button"}
          className="w-12 h-12 object-cover rounded-full"
        />
      )}

      {icon && <span className="text-xl">{icon}</span>}

      {title && (
        <span className="hidden md:block text-sm font-medium">
          {title}
        </span>
      )}

      {/* Tooltip */}
      {title && (
        <span className="absolute right-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          {title}
        </span>
      )}
    </motion.button>
  )
}

export default FloatingButton