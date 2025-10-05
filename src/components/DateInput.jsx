import clsx from "clsx";
import { useTheme } from "../hooks/useTheme";
import { normalizeValidation } from "../utils/validations";
import { useTranslation } from "react-i18next";

// Date input component with validation and theming support max provides max limit of the date that can be choosed.

export default function DateInput({
  label,
  name,
  register,
  required = false,
  rules,
  error,
  max,
  className = "",
  inputClassName = "",
  ...rest
}) {
  const { theme } = useTheme();
  const { t } = useTranslation();


  const validation = normalizeValidation(
    required,
    rules,
    null,
    `${label || "Date"} ${t("error.required")}`
  );

  return (
    <div className={clsx("flex flex-col", className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium mb-1 block">
          {label}
          {(required === true || (required && required.value)) && (
            <span className={clsx("ml-0.5", theme.colors?.danger)}>*</span>
          )}
        </label>
      )}

      <input
        id={name}
        type="date"
        max={max}
        {...(register ? register(name, validation) : {})}
        {...rest}
        className={clsx(
          "w-full border rounded-md p-2 text-sm transition-colors duration-150 focus:outline-none focus:ring-2",
          theme.layers?.base || "bg-white text-gray-900",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
          inputClassName
        )}
        aria-invalid={!!error}
      />

      {error && (
        <p className={clsx("text-xs mt-1", theme.colors?.danger)}>
          {error.message || "Invalid date"}
        </p>
      )}
    </div>
  );
}
