import { useEffect } from "react"
import { useTranslation } from "react-i18next"

// Language Switcher Component - Allows users to switch between English and Arabic languages, updates document attributes accordingly

export default function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation()

  const setLang = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem("lang", lang)
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr")
    document.documentElement.setAttribute("lang", lang)
  }

  useEffect(() => {
    const lang = i18n.language || localStorage.getItem("lang") || "en"
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr")
    document.documentElement.setAttribute("lang", lang)
  }, [i18n.language])

  return (
    <div className={className}>
      <button
        onClick={() => setLang("en")}
        className="px-2 py-1 mr-2 rounded border cursor-pointer"
        aria-label="English"
      >
        EN
      </button>
      <button
        onClick={() => setLang("ar")}
        className="px-2 py-1 mr-2 rounded border cursor-pointer"
        aria-label="Arabic"
      >
        ع
      </button>
    </div>
  )
}
