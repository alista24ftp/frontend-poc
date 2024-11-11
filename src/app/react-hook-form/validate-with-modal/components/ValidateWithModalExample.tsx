"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { Controller, FormProvider, useForm } from "react-hook-form";

import styles from "@/app/react-hook-form/validate-with-modal/components/ValidateWithModalExample.module.scss";
import { FormData } from "@/app/react-hook-form/validate-with-modal/types/FormData";
import { ControlledInput } from "@/components/form/ControlledInput";
import { FormDialog } from "@/app/react-hook-form/validate-with-modal/components/FormDialog";

export const ValidateWithModalExample = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const formMethods = useForm<FormData>({
    defaultValues: {
      field1: "abc123",
      details: {
        field2: "123",
        field3: 50,
      },
    },
    reValidateMode: "onChange",
  });

  const { handleSubmit, watch, setValue, unregister } = formMethods;
  const details = watch("details");
  const hasDetails = details.field2 !== "";

  const onSubmit = () => {
    console.log("Form submitted successfully!");
  };

  const onOpenDialog = () => {
    if (hasDetails) return;
    unregister("details", {
      keepValue: true,
      keepError: false,
      keepTouched: true,
      keepDirty: true,
      keepDirtyValues: true,
      keepIsValid: false,
    });
    setShowDialog(true);
  };

  const onCloseDialog = () => {
    setValue("details", {
      field2: "",
      field3: 0,
    });

    setShowDialog(false);
  };

  const onSubmitDialogForm = (formData: { field2: string; field3: number }) => {
    setValue("details", formData);
    setShowDialog(false);
  };

  const onRemoveDetails = () => {
    setValue("details", {
      field2: "",
      field3: 0,
    });
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

        {hasDetails ? (
          <div className={styles.detailsDisplay}>
            <div>
              <div className={`${styles.detail} ${styles.field2Details}`}>
                <span className={styles.detailLabel}>Field 2</span>

                <p className={styles.detailValue}>{details.field2}</p>
              </div>

              <div className={styles.detail}>
                <span className={styles.detailLabel}>Field 3</span>

                <p className={styles.detailValue}>{details.field3}</p>
              </div>
            </div>

            <Button
              className={styles.removeDetailsButton}
              onClick={onRemoveDetails}
            >
              Remove Details
            </Button>
          </div>
        ) : (
          <Controller
            name="details"
            rules={{
              validate: () => details.field2 || "Details must be added",
            }}
            render={({ fieldState: { error } }) => (
              <div className={styles.addDetails}>
                <Button
                  onClick={onOpenDialog}
                  disabled={hasDetails}
                  className={styles.addDetailsButton}
                >
                  <FaPlus />
                  <span className={styles.addDetailsButtonText}>
                    Add Details
                  </span>
                </Button>

                {error?.message ? (
                  <p className={styles.detailsError}>{error.message}</p>
                ) : null}
              </div>
            )}
          />
        )}

        <Button type="submit" className={styles.submitButton}>
          Submit Form
        </Button>
      </form>

      {showDialog ? (
        <FormDialog
          open={showDialog}
          onClose={onCloseDialog}
          onSubmit={onSubmitDialogForm}
        />
      ) : null}
    </FormProvider>
  );
};
