import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";
import { icons } from "../assets/icons";

// Success Page Component - Displays a success message after form submission

const SuccessPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className={`space-y-6 p-8 rounded-lg shadow-md text-left ${theme.layers.surface}`}
    >
      <div className="flex flex-col items-start gap-4">
        <span>
          {icons.success}
        </span>

        <h1 className={`text-2xl font-bold ${theme.colors.success}`}>
          {t("success.title")}
        </h1>

        <p className="text-sm md:text-base leading-relaxed max-w-lg">
          {t("success.message")}
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className={`${theme.buttons.base} ${theme.buttons.info} cursor-pointer`}
        >
          {t("success.back")}
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
