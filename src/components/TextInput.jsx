
import clsx from 'clsx'
import { useTheme } from '../hooks/useTheme'
import { normalizeValidation } from '../utils/validations'

// Text input component with validation and theming support

export default function TextInput({
  label,
  name,
  register,
  required = false,
  rules,
  type = 'text',
  placeholder = '',
  error,
  className = '',
  inputClassName = '',
  id,
  ...rest
}) {
  const { theme: themeObj } = useTheme()
  const tid = id || name

  const baseLayer = themeObj.layers?.base || 'bg-white text-gray-900'
  const dangerColor = themeObj.colors?.danger || 'text-red-600'

  const validation = normalizeValidation(required, rules, null, `${label || name} is required`)

  const inputCls = clsx(
    'rounded-md border p-2 text-sm transition-colors duration-150 focus:outline-none focus:ring-2',
    baseLayer,
    error ? 'border-red-500 focus:border-red-500 focus:ring-red-300' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200',
    inputClassName
  )

  const wrapperCls = clsx('flex flex-col', className)
  const labelCls = clsx('text-sm font-medium mb-1', baseLayer && '')

  return (
    <div className={wrapperCls}>
      {label && (
        <label htmlFor={tid} className={labelCls}>
          {label}
          { (required === true || (required && required.value)) && <span className={clsx('ml-0.5', dangerColor)}>*</span> }
        </label>
      )}

      <input
        id={tid}
        name={name}
        type={type}
        placeholder={placeholder}
        {...(register ? register(name, validation) : {})}
        className={inputCls}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${tid}-error` : undefined}
        {...rest}
      />

      {error && (
        <p id={`${tid}-error`} className={clsx('text-xs mt-1', dangerColor)}>
          {error.message || 'Invalid value'}
        </p>
      )}
    </div>
  )
}
