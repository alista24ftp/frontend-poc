"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@mui/material";

import styles from "@/app/react-hook-form/async-validation/components/AsyncValidationExample.module.scss";
import { ControlledInput } from "@/components/form/ControlledInput";

interface CustomFormData {
  field1: string;
  field2: string;
  field3: string;
}

export const AsyncValidationExample = () => {
  const formMethods = useForm<CustomFormData>({
    defaultValues: {
      field1: "",
      field2: "",
      field3: "",
    },
    reValidateMode: "onChange",
  });

  const { watch, handleSubmit } = formMethods;
  const formData = watch();

  const asyncValidate = async (data: CustomFormData) => {
    if (data.field3.includes("x")) {
      return {
        violations: [
          { fieldReference: "field3", message: "Cannot have character x" },
        ],
      };
    }

    return { violations: [] };
  };

  const onSubmit = () => {
    console.log("Form submitted successfully");
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <ControlledInput
          name="field1"
          options={{
            required: { value: true, message: "field1 is required." },
          }}
          inputId="input-field1"
          inputLabel={{
            component: "Field 1",
          }}
          formControl={{
            className: styles.firstInput,
          }}
        />

        <ControlledInput
          name="field2"
          options={{
            required: { value: true, message: "field2 is required." },
          }}
          inputId="input-field2"
          inputLabel={{
            component: "Field 2",
          }}
          formControl={{
            className: styles.input,
          }}
        />

        <ControlledInput
          name="field3"
          options={{
            validate: async () => {
              const validationResults = await asyncValidate(formData);
              return validationResults.violations.length > 0
                ? validationResults.violations[0].message
                : true;
            },
          }}
          inputId="input-field3"
          inputLabel={{
            component: "Field 3",
          }}
          formControl={{
            className: styles.input,
          }}
        />

        <Button type="submit" className={styles.submitButton}>
          Submit Form
        </Button>
      </form>
    </FormProvider>
  );
};
