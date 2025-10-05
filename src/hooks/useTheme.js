
import { useState, useEffect } from "react"
import { darkTheme, lightTheme } from "../assets/theme"

// Custom hook to manage and provide theming (light/dark) based on user preference or system settings

export function useTheme() {
  const [isDark, setIsDark] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  )

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = e => setIsDark(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return {
    theme: isDark ? darkTheme : lightTheme,
    mode: isDark ? "dark" : "light",
    toggle: () => setIsDark(d => !d),
  }
}
