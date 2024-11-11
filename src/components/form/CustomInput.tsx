import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";

import styles from "@/components/form/CustomInput.module.scss";
import { getDefaultRequiredVal } from "@/helpers/getDefaultValues";

export interface CustomInputProps extends OutlinedInputProps {
  inputId: string;
  inputLabel?: {
    component?: React.ReactNode;
  };
  helperText?: {
    messages: string[];
    errors: string[];
  };
  formControl?: {
    className?: string;
  };
}

export const CustomInput = (props: CustomInputProps) => {
  const { inputId, inputLabel, helperText, formControl, ...inputProps } = props;

  const helperTextId = `${inputId}-helper-text`;
  const helperMessages = getDefaultRequiredVal([], helperText?.messages);
  const helperErrors = getDefaultRequiredVal([], helperText?.errors);
  const helperTexts = [
    ...helperMessages.map((msg) => ({ msg, isError: false })),
    ...helperErrors.map((err) => ({ msg: err, isError: true })),
  ];

  const inputClassName = `
    ${getDefaultRequiredVal("", inputProps.className)} ${styles.customInput} 
    ${helperErrors.length > 0 ? styles.customErrorInput : ""}
  `;

  return (
    <FormControl {...formControl}>
      {inputLabel?.component ? (
        <InputLabel
          htmlFor={inputId}
          shrink={true}
          variant="outlined"
          className={styles.customInputLabel}
        >
          {inputLabel?.component}
        </InputLabel>
      ) : null}

      <OutlinedInput
        {...inputProps}
        id={props.inputId}
        aria-describedby={helperTexts.length > 0 ? helperTextId : undefined}
        className={inputClassName}
      />

      {helperTexts.length > 0
        ? helperTexts.map(({ msg, isError }, index) => {
            const helperTextClassName = isError
              ? styles.customInputErrorHelperText
              : styles.customInputHelperText;
            const helperTextProps = index === 0 ? { id: helperTextId } : {};
            return (
              <FormHelperText
                key={msg}
                className={helperTextClassName}
                {...helperTextProps}
              >
                {msg}
              </FormHelperText>
            );
          })
        : null}
    </FormControl>
  );
};
