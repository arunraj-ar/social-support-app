import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../context/FormContext";
import { useTheme } from "../hooks/useTheme";
import { useForm } from "react-hook-form";
import FormNavigation from "../components/FormNavigation";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";

// Family & Financial Information Page Component - Collects user's family and financial details

const FamilyFinancialInfo = () => {
  const { theme } = useTheme();
  const { data, update } = useFormData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: data.family,
    mode: "onTouched",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      update("family", value);
    });
    return () => subscription.unsubscribe();
  }, [watch, update]);

  const onSubmit = (values) => {
    update("family", values);
    navigate("/situation");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${theme.card} w-full max-w-3xl space-y-5`}
    >
      <h2 className="text-xl font-semibold mb-2">
        Family & Financial Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput
          label="Marital Status"
          name="maritalStatus"
          register={register}
          required={{ value: true, message: "Please select marital status" }}
          error={errors.maritalStatus}
          options={[
            { value: "single", label: "Single" },
            { value: "married", label: "Married" },
            { value: "widowed", label: "Widowed" },
            { value: "divorced", label: "Divorced" },
          ]}
          placeholder="Select"
        />

        <TextInput
          label="Dependents"
          name="dependents"
          register={register}
          type="number"
          error={errors.dependents}
          inputClassName="appearance-none"
          required={{ value: true, message: "Please enter number of dependentsx" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput
          label="Employment Status"
          name="employmentStatus"
          register={register}
          required={{ value: true, message: "Please select employment status" }}
          error={errors.employmentStatus}
          options={[
            { value: "employed", label: "Employed" },
            { value: "self-employed", label: "Self-employed" },
            { value: "unemployed", label: "Unemployed" },
            { value: "student", label: "Student" },
            { value: "retired", label: "Retired" },
          ]}
          placeholder="Select"
        />

        <TextInput
          label="Monthly Income"
          name="monthlyIncome"
          register={register}
          type="number"
          required={{ value: true, message: "Please enter your monthly income" }}
          error={errors.monthlyIncome}
        />
      </div>

      <SelectInput
        label="Housing Status"
        name="housingStatus"
        register={register}
        required={{ value: true, message: "Please select housing status" }}
        error={errors.housingStatus}
        options={[
          { value: "own", label: "Own" },
          { value: "rent", label: "Rent" },
          { value: "living_with_family", label: "Living with family" },
          { value: "temporary", label: "Temporary / Other" },
        ]}
        placeholder="Select"
      />

      <FormNavigation backTo="/personal" />
    </form>
  );
};

export default FamilyFinancialInfo;
