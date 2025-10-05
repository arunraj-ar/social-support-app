import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

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

  return (
    <div className="flex justify-between pt-6">
      {onClear ? (
        <button
          type="button"
          onClick={() => { onClear(); navigate(backTo); }}
          className={`${theme.buttons.base} ${theme.buttons.danger} cursor-pointer`}
        >
          Cancel
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
          Back
        </button>
      )}

      {showSubmit ? (
        <button
          type="button"
          onClick={onSubmit}
          className={`${theme.buttons.base} ${theme.buttons.success} cursor-pointer`}
          disabled={isSubmitting}
        >
          Submit
        </button>
      ) : (
        <button
          type="submit"
          onClick={() => nextTo && navigate(nextTo)}
          className={`${theme.buttons.base} ${theme.buttons.success} cursor-pointer`}
        >
          Next
        </button>
      )}
    </div>
  );
}
