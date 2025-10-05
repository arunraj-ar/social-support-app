import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useFormData } from "../context/FormContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextArea from "../components/TextAreaInput";
import HelpMeWrite from "../components/HelpMeWrite";
import FormNavigation from "../components/FormNavigation";
import { buildPromptFor } from "../utils/common";
import { requestSubmitApplication } from "../api/form";
import { useTranslation } from "react-i18next";

// Situation Descriptions Page Component - Collects user's situation details with AI assistance

const SituationDescriptions = () => {
  const { theme } = useTheme();
  const { data, update, clear } = useFormData();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const language = useTranslation().i18n.language;


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: data.situation || {},
    mode: "onTouched",
  });
  useEffect(() => {
    const subscription = watch((value) => {
      update("situation", value);
    });
    return () => subscription.unsubscribe();
  }, [watch, update]);

const onSubmit = async (values) => {
  try {
    update("situation", values);

    const payload = {
      personal: data.personal,
      family: data.family,
      situation: values,
    };
    setSubmitting(true);
    const response = await requestSubmitApplication(payload);
    setSubmitting(false);

    if (!response.ok) {
      throw new Error(response.error || "Submission failed");
    }
    clear();
    navigate("/success");
  } catch (err) {
    console.error("Submit failed:", err.message);
    alert("There was an issue submitting your application. Please try again.");
  }
};


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${theme.card} w-full max-w-3xl space-y-6`}
    >
      <h2 className="text-xl font-semibold">Situation Descriptions</h2>

      <div>
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
          <TextArea
            label="Current Financial Situation"
            name="financial"
            register={register}
            required
            error={errors.financial}
            rows={5}
          />
          </div>
          <div className="md:flex-none flex items-end">
            <HelpMeWrite
              fieldKey="financial"
              buildPrompt={buildPromptFor("financial", language)}
              formData={data}
              onAccept={(val) => {
                setValue("financial", val, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
                update("situation", { ...data.situation, financial: val });
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
          <TextArea
            label="Employment Circumstances"
            name="employment"
            register={register}
            required
            error={errors.employment}
            rows={4}
          />
          </div>
          <div className="md:flex-none flex items-end">
            <HelpMeWrite
              fieldKey="employment"
              buildPrompt={buildPromptFor("employment", language)}
              formData={data}
              onAccept={(val) => {
                setValue("employment", val, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
                update("situation", { ...data.situation, employment: val });
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
          <TextArea
            label="Reason for Applying"
            name="reason"
            register={register}
            required
            error={errors.reason}
            rows={4}
          />
          </div>
         <div className="md:flex-none flex items-end">
            <HelpMeWrite
              fieldKey="reason"
              buildPrompt={buildPromptFor("reason", language)}
              formData={data}
              onAccept={(val) => {
                setValue("reason", val, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
                update("situation", { ...data.situation, reason: val });
              }}
            />
          </div>
        </div>
      </div>

      <FormNavigation
        backTo="/family"
        showSubmit={true}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={submitting}
      />
    </form>
  );
};

export default SituationDescriptions;
