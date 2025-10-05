import clsx from "clsx"
import { useTheme } from "../hooks/useTheme"
import { normalizeValidation } from "../utils/validations"

// Email input component with validation and theming support

export default function EmailInput({
  label = "Email",
  name = "email",
  register,
  required = false,
  rules,
  error,
  placeholder = "you@example.com",
  className = "",
  inputClassName = "",
  ...rest
}) {
  const { theme } = useTheme()
  const baseLayer = theme.layers?.base || "bg-white text-gray-900"
  const dangerColor = theme.colors?.danger || "text-red-600"

  const defaultPattern = {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Enter a valid email address",
  }

  const validation = normalizeValidation(required, rules, defaultPattern, "Email is required")

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
        type="email"
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
          {error.message || "Invalid email"}
        </p>
      )}
    </div>
  )
}
