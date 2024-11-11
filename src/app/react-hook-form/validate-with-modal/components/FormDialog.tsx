"use client";

import { useFormContext } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import styles from "@/app/react-hook-form/validate-with-modal/components/FormDialog.module.scss";
import { FormData } from "@/app/react-hook-form/validate-with-modal/types/FormData";
import { ControlledInput } from "@/components/form/ControlledInput";

export const FormDialog = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: { field2: string; field3: number }) => void;
}) => {
  const formMethods = useFormContext<FormData>();
  const { handleSubmit } = formMethods;

  const submitAndExit = (data: FormData) => {
    onSubmit({
      field2: data.details.field2,
      field3: data.details.field3,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(submitAndExit)}>
        <DialogTitle>Form Dialog</DialogTitle>

        <DialogContent className={styles.dialogContent}>
          <ControlledInput
            name="details.field2"
            options={{
              required: { value: true, message: "field2 is required." },
            }}
            inputId="input-field2"
            inputLabel={{
              component: "Field 2",
            }}
            formControl={{
              className: styles.firstInput,
            }}
          />

          <ControlledInput
            name="details.field3"
            type="number"
            options={{
              required: { value: true, message: "field3 is required." },
              valueAsNumber: true,
              validate: {
                exceed: (value: number) =>
                  value < 100 || "field3 cannot exceed 100",
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
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </Button>

          <Button type="submit" className={styles.submitButton}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
