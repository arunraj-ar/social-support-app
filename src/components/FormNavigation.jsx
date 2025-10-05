import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";

// Form Navigation Component - Renders navigation buttons back, next, cancel and submit for form steps
// Cancel and submit clears the form from context and localStorage

export default function FormNavigation({
  backTo,
  nextTo,
  onSubmit,
  onClear,
  isSubmitting = false,
  showSubmit = false,
  disableBack = false,
}) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const {t } = useTranslation();

  return (
    <div className="flex justify-between pt-6">
      {onClear ? (
        <button
          type="button"
          onClick={() => { onClear(); navigate(backTo); }}
          className={`${theme.buttons.base} ${theme.buttons.danger} cursor-pointer`}
        >
          {t("buttons.cancel")}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => !disableBack && navigate(backTo)}
          disabled={disableBack}
          className={`${theme.buttons.base} ${
            disableBack
              ? `${
                  theme.buttons.disabled || "bg-gray-300 text-gray-600"
                } cursor-not-allowed`
              : `${theme.buttons.warning} cursor-pointer`
          }`}
        >
          {t("buttons.back")}
        </button>
      )}

      {showSubmit ? (
        <button
          type="button"
          onClick={onSubmit}
          className={`${theme.buttons.base} ${theme.buttons.success} cursor-pointer`}
          disabled={isSubmitting}
        >
          {t("buttons.submit")}
        </button>
      ) : (
        <button
          type="submit"
          onClick={() => nextTo && navigate(nextTo)}
          className={`${theme.buttons.base} ${theme.buttons.success} cursor-pointer`}
        >
          {t("buttons.next")}
        </button>
      )}
    </div>
  );
}
