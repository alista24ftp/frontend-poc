"use client";

import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

import { CustomInput, CustomInputProps } from "@/components/form/CustomInput";
import { getDefaultRequiredVal } from "@/helpers/getDefaultValues";

interface ControlledInputProps extends Omit<CustomInputProps, "name"> {
  name: string;
  options?: RegisterOptions;
}

export const ControlledInput = (props: ControlledInputProps) => {
  const { inputId, inputLabel, helperText, formControl, name, options } = props;
  const { register } = useFormContext();

  return (
    <Controller
      {...register(name, options)}
      render={({ field, fieldState: { error } }) => {
        const existingErrors = getDefaultRequiredVal([], helperText?.errors);
        const allErrors = error?.message
          ? [...existingErrors, error.message]
          : existingErrors;
        return (
          <CustomInput
            inputId={inputId}
            inputLabel={inputLabel}
            helperText={{
              messages: getDefaultRequiredVal([], helperText?.messages),
              errors: allErrors,
            }}
            formControl={formControl}
            {...field}
          />
        );
      }}
    />
  );
};
