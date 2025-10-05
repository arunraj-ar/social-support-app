import { useLocation } from "react-router-dom";
import { useFormData } from "../context/FormContext";
import { calculateFormProgress } from "../utils/common";
import { useMemo } from "react";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";

// Progress Bar Component - Displays the current progress of the multi-step form based on completed sections
// Total 3 steps based on routes: personal, family, situation
// Progress is calculated from filled fields in form data context

export default function ProgressBar() {
  const { theme } = useTheme();
  const { data } = useFormData();
  const location = useLocation();
  const {t} = useTranslation();
  const path = location.pathname.replace(/\/$/, "");
  const lastSegment = path.substring(path.lastIndexOf("/") + 1);
  const stepCount = {
    personal: 1,
    family: 2,
    situation: 3,
  };

  const percent = useMemo(() => calculateFormProgress(data), [data]);

  return (
    <div className="mb-6">
      <div className="text-sm mb-2">{t("progress.step")} {stepCount[lastSegment]}/3</div>
      <div
        className={`w-full ${theme.layers.surface} h-2 rounded`}
      >
        <div
          style={{ width: `${percent}%` }}
          className="h-2 bg-blue-600 rounded"
        />
      </div>
    </div>
  );
}
