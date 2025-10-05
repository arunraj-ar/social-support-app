// Function for form progress calculation of the form based on how many fields are filled.

export const calculateFormProgress = (data) => {
  let total = 0;
  let filled = 0;

  function walk(value) {
    if (typeof value === "function" || typeof value === "symbol") return;

    if (value === null || value === undefined) {
      total += 1;
      return;
    }

    if (Array.isArray(value)) {
      total += 1;
      if (value.length > 0) filled += 1;
      return;
    }

    if (typeof value === "object") {
      const keys = Object.keys(value);
      if (keys.length === 0) return;
      keys.forEach((k) => walk(value[k]));
      return;
    }

    total += 1;
    if (typeof value === "string") {
      if (value.trim() !== "") filled += 1;
    } else {
      filled += 1;
    }
  }

  walk(data);
  const percent =
    total === 0
      ? 0
      : Math.min(Math.max(Math.round((filled / total) * 100), 0), 100);
  return percent;
};

// Function to build AI prompt based on field key and language, incorporating form data. Only user prompt is created. Improvement can be done and a proper system prompt can be added.

export const buildPromptFor = (fieldKey, langCode) => (formData) => {
  // improvement sanitize the data values to avoid injection
  const name = (formData.personal && formData.personal.name) || "";
  const city = (formData.personal && formData.personal.city) || "";
  const languageMapping = {
    en: "English",
    ar: "Arabic",
  };
  const employment =
    (formData.family && formData.family.employmentStatus) || "";
  const income = (formData.family && formData.family.monthlyIncome) || "";
  const base = `You are helping a citizen apply for government financial assistance. Their name is ${
    name || "N/A"
  }. They live in ${city || "N/A"}. Employment status: ${
    employment || "N/A"
  }, monthly income: ${income || "N/A"}.\n\n`;
  const fieldInstructions = {
    financial:
      "Write a clear, concise paragraph describing the applicant's current financial hardship. Include specifics about income, expenses, debts if any, and urgency.",
    employment:
      "Write a concise description of the applicant's employment circumstances (job history, lost job, hours, employer, reason for unemployment if applicable).",
    reason:
      "Write a clear, empathetic statement describing why the applicant is applying for support and what the funds will be used for.",
  };
  const instruction =
    fieldInstructions[fieldKey] || `Write a short paragraph about ${fieldKey}.`;
  return (
    base +
    instruction +
    `\n\nBe concise (1-2 short paragraphs) and use plain language suitable for government forms. Write the response from the applicant's point of view, using first-person language (I, me, my). Keep it clear, natural, and sincere. Reply in ${
      languageMapping[langCode] || "English"
    } language completely.`
  );
};
