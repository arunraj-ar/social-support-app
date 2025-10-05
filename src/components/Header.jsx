import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import LanguageSwitcher from "./LanguageSwitcher";
import { icons } from "../assets/icons";
import { useTranslation } from "react-i18next";

// Header Component - Displays the application header with title, subtitle and language switcher

export default function Header() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header
      className={`sticky top-0 z-50 ${theme.layers.surface} border-b ${
        theme.layers.elevated ? "" : "bg-white"
      } `}
      style={{ backdropFilter: "saturate(120%) blur(6px)" }}
    >
      <div
        className={`
          mx-auto w-full md:w-4/5 lg:w-1/2 max-w-3xl min-w-[320px]
          flex items-center justify-between gap-4
          px-4 py-3
        `}
      >
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div
            className={`flex items-center justify-center rounded-full w-9 h-9 ${
              theme.card.includes("bg") ? "" : "bg-blue-100"
            }`}
          >
            <span className="text-lg">{icons.header}</span>
          </div>
          <div className="text-left">
            <div
              className={`text-base font-semibold ${theme.colors?.info || ""}`}
            >
                {t("header.title")}
            </div>
            <div className="text-xs text-gray-500">{t("header.subtitle")}</div>
          </div>
        </div>
        <div className="flex items-center">
          <LanguageSwitcher className="ml-2" />
        </div>
      </div>
    </header>
  );
}
