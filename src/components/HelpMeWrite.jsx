import { useState } from "react";
import clsx from "clsx";
import { useTheme } from "../hooks/useTheme";
import TextArea from "./TextAreaInput";
import { requestWriteSuggestion } from "../api/openai";
import { icons } from "../assets/icons";
import { useTranslation } from "react-i18next";

// HelpMeWrite Component - Provides AI-generated text suggestions for form fields, holds the button and Modal that gives AI suggestions.

export default function HelpMeWrite({
  fieldKey,
  buildPrompt,
  formData,
  onAccept,
  helpingFieldLabel,
}) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [edited, setEdited] = useState("");
  const { t } = useTranslation();

  async function fetchSuggestion() {
    setError(null);
    setLoading(true);
    setSuggestion("");
    setEdited("");

    const prompt = buildPrompt
      ? buildPrompt(formData)
      : `Help me write about ${fieldKey}`;

    try {
      const text = (await requestWriteSuggestion(prompt)) || "";
      setSuggestion(text.trim());
      setEdited(text.trim());
    } catch (err) {
      setError("Failed to fetch suggestion. Try again.");
      console.error("HelpMeWrite error:", err);
    } finally {
      setLoading(false);
    }
  }

  const openModal = () => {
    setOpen(true);
    fetchSuggestion();
  };

  const closeModal = () => {
    setOpen(false);
    setError(null);
    setSuggestion("");
    setEdited("");
  };

  const handleAccept = () => {
    onAccept && onAccept(edited);
    closeModal();
  };

  return (
    <>
      <div className="flex items-center mt-1">
        <button
          type="button"
          onClick={openModal}
          className={clsx(
            theme.buttons.base,
            theme.buttons.info,
            "h-9 px-3 text-sm whitespace-nowrap inline-flex items-center gap-3 cursor-pointer"
          )}
        >
          <span
            aria-hidden="true"
            className="text-lg leading-none flex-shrink-0"
            style={{ lineHeight: 1 }}
          >
            {icons.star}
          </span>

          <span className="leading-none">{t("help.helpMeWrite")}</span>
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`helpme-${fieldKey}-title`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div className={clsx("relative z-10 w-full max-w-2xl", theme.card)}>
            <div className="flex items-start justify-between gap-4">
              <h3
                id={`helpme-${fieldKey}-title`}
                className="text-lg font-semibold"
              >
                {t("help.suggestion")} {helpingFieldLabel}
              </h3>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="text-sm text-gray-500 cursor-pointer"
              >
                {t("help.close")}
              </button>
            </div>

            <div className="mt-4">
              {loading ? (
                <div className="p-6 text-center">{t("help.generating")}</div>
              ) : error ? (
                <div className="p-4 text-sm text-red-600">{error}</div>
              ) : (
                <TextArea
                  name="suggestion"
                  onChange={(e) => setEdited(e.target.value)}
                  rows={8}
                  value={edited}
                />
              )}
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setEdited(suggestion);
                }}
                disabled={!suggestion || loading}
                className={`${theme.buttons.base} ${theme.buttons.warning} cursor-pointer`}
              >
                {t("help.reset")}
              </button>

              <button
                type="button"
                onClick={handleAccept}
                disabled={loading || !edited}
                className={`${theme.buttons.base} ${theme.buttons.success} cursor-pointer`}
              >
                {t("help.accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
