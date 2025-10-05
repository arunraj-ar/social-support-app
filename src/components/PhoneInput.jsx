
import clsx from "clsx"
import { normalizeValidation } from "../utils/validations"
import { useTheme } from "../hooks/useTheme"
import { useTranslation } from "react-i18next";

// Phone input component with validation and theming support

export default function PhoneInput({
  label = "Phone",
  name = "phone",
  register,
  required = false,
  rules,
  error,
  placeholder = "Enter your phone number",
  className = "",
  inputClassName = "",
  ...rest
}) {
  const { theme } = useTheme()
  const {t} = useTranslation();
  const baseLayer = theme.layers?.base || "bg-white text-gray-900"
  const dangerColor = theme.colors?.danger || "text-red-600"

  const defaultPattern = {
    value: /^[0-9+\-() ]{7,15}$/,
    message: t("error.validPhone"),
  }

  const validation = normalizeValidation(required, rules, defaultPattern, `${t("personal.phone")} ${t("error.required")}`)

  return (
    <div className={clsx("flex flex-col", className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium mb-1 block">
          {label}
          {(required === true || (required && required.value)) && (
            <span className={clsx("ml-0.5", dangerColor)}>*</span>
          )}
        </label>
      )}

      <input
        id={name}
        type="tel"
        placeholder={placeholder}
        {...(register ? register(name, validation) : {})}
        className={clsx(
          "w-full border rounded-md p-2 text-sm transition-colors duration-150 focus:outline-none focus:ring-2",
          baseLayer,
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
          inputClassName
        )}
        aria-invalid={!!error}
        {...rest}
      />

      {error && (
        <p className={clsx("text-xs mt-1", dangerColor)}>
          {error.message || "Invalid phone number"}
        </p>
      )}
    </div>
  )
}
