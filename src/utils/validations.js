// Utility function to normalize validation rules for form fields

export function normalizeValidation(required, rules, defaultPattern = null, defaultRequiredMsg = "This field is required") {
  if (rules && typeof rules === "object") return rules

  const looksLikeRules = (obj) =>
    obj &&
    typeof obj === "object" &&
    (Object.prototype.hasOwnProperty.call(obj, "required") ||
      Object.prototype.hasOwnProperty.call(obj, "pattern") ||
      Object.prototype.hasOwnProperty.call(obj, "validate"))

  if (looksLikeRules(required)) return required

  if (required === true) {
    return defaultPattern
      ? { required: defaultRequiredMsg, pattern: defaultPattern }
      : { required: defaultRequiredMsg }
  }

  if (required && typeof required === "object" && ("value" in required || "message" in required)) {
    const isReq = !!required.value
    const msg = required.message || defaultRequiredMsg
    return isReq ? (defaultPattern ? { required: msg, pattern: defaultPattern } : { required: msg }) : (defaultPattern ? { pattern: defaultPattern } : {})
  }

  return defaultPattern ? { pattern: defaultPattern } : {}
}
