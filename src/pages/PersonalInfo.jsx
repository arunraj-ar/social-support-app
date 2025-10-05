import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../context/FormContext";
import TextInput from "../components/TextInput";
import { useTheme } from "../hooks/useTheme";
import DateInput from "../components/DateInput";
import SelectInput from "../components/SelectInput";
import PhoneInput from "../components/PhoneInput";
import EmailInput from "../components/EmailInput";
import FormNavigation from "../components/FormNavigation";
import { useTranslation } from "react-i18next";

// Personal Information Page Component - Collects user's personal details

export default function PersonalInfo() {
  const { theme } = useTheme();
  const { data, update, clear } = useFormData();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: data.personal,
  });

  useEffect(() => {
    const subscription = watch((value) => {
      update("personal", value);
    });
    return () => subscription.unsubscribe();
  }, [watch, update]);

  const onSubmit = (values) => {
    update("personal", values);
    navigate("/family");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${theme.card} ${theme.layers.surface} w-full max-w-3xl space-y-5`}
    >
      <h2 className="text-xl font-semibold mb-2">{t("personal.title")}</h2>

      <TextInput
        label={t("personal.name")}
        name="name"
        register={register}
        required
        error={errors.name}
      />

      <TextInput
        label={t("personal.id")}
        name="nationalId"
        register={register}
        required
        error={errors.nationalId}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DateInput
          label={t("personal.dob")}
          name="dob"
          register={register}
          required
          error={errors.dob}
          max={today}
        />

        <SelectInput
          label={t("personal.gender")}
          name="gender"
          register={register}
          required
          error={errors.gender}
          options={[
            { value: "female", label: t("personal.genderOptions.female") },
            { value: "male", label: t("personal.genderOptions.male") },
            { value: "other", label: t("personal.genderOptions.other") },
          ]}
          placeholder={t("personal.select")}
        />
      </div>

      <TextInput
        label={t("personal.address")}
        name="address"
        register={register}
        error={errors.address}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextInput
          label={t("personal.city")}
          name="city"
          register={register}
          error={errors.city}
          required
        />
        <TextInput
          label={t("personal.state")}
          name="state"
          register={register}
          error={errors.state}
          required
        />
        <TextInput
          label={t("personal.country")}
          name="country"
          register={register}
          error={errors.country}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PhoneInput
          label={t("personal.phone")}
          name="phone"
          register={register}
          required
          // add custom validation based on country
          error={errors.phone}
          placeholder={t("error.enterPhone")}
        />

        <EmailInput
          label={t("personal.email")}
          name="email"
          register={register}
          required={{ value: true, message: `${t("personal.email")} ${t("error.required")}` }}
          error={errors.email}
        />
      </div>

      <FormNavigation backTo="/" onClear={clear} />
    </form>
  );
}
