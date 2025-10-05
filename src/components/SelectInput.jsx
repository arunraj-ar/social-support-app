import clsx from "clsx"
import { useTheme } from "../hooks/useTheme"
import { normalizeValidation } from "../utils/validations"

// Select input component with validation and theming support

export default function SelectInput({
  label,
  name,
  register,
  required = false,
  rules,
  error,
  options = [],
  placeholder = "Select",
  className = "",
  selectClassName = "",
  defaultValue = "",
  ...rest
}) {
  const { theme } = useTheme()

  const wrapperCls = clsx("flex flex-col", className)
  const labelCls = clsx("text-sm font-medium mb-1 block", theme.app || "")
  const baseLayer = theme.layers?.base || "bg-white text-gray-900"
  const dangerColor = theme.colors?.danger || "text-red-600"

  const selectCls = clsx(
    "w-full border rounded-md p-2 text-sm transition-colors duration-150 focus:outline-none focus:ring-2",
    baseLayer,
    error
      ? "border-red-500 focus:border-red-500 focus:ring-red-300"
      : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
    selectClassName
  )
  const validation = normalizeValidation(required, rules, null, `${label || name} is required`)

  return (
    <div className={wrapperCls}>
      {label && (
        <label htmlFor={name} className={labelCls}>
          {label}
          {(required === true || (required && required.value)) && (
            <span className={clsx("ml-0.5", dangerColor)}>*</span>
          )}
        </label>
      )}

      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        {...(register ? register(name, validation) : {})}
        className={selectCls}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p id={`${name}-error`} className={clsx("text-xs mt-1", dangerColor)}>
          {error.message || "Invalid value"}
        </p>
      )}
    </div>
  )
}
