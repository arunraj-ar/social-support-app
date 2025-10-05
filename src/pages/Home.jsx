import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";

// Home Page Component

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div
      className={`space-y-6 p-6 rounded-lg shadow-md ${theme.layers.surface}`}
    >
      <h1 className={`text-2xl font-bold ${theme.colors.info}`}>
        {t("home.title")}
      </h1>

      <p className={`text-sm md:text-base leading-relaxed max-w-lg`}>
        {t("home.desc")}
      </p>

      <div>
        <button
          type="button"
          onClick={() => navigate("/personal")}
          className={`${theme.buttons.base} ${theme.buttons.success} cursor-pointer`}
        >
          {t("home.start")}
        </button>
      </div>
    </div>
  );
};

export default Home;
