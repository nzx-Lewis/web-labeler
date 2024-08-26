import { Button } from "@mantine/core";
import {
  colorSwatches,
  positions,
  ruleTypes,
  shapes,
} from "../../../options/constants.ts";
import { LabelEditFormProps } from "./types.ts";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useLabelEditForm, LabelEditFormProvider } from "./formContext.ts";
import LabelEditFormAppearance from "./EditFormAppearance";
import LabelEditFormRules from "./EditFormRules";
import { useEffect } from "react";

function LabelEditForm({ label, dispatch, onSave }: LabelEditFormProps) {
  const form = useLabelEditForm({
    initialValues: {
      name: "",
      bgColor: colorSwatches[0],
      textColor: colorSwatches[colorSwatches.length - 1],
      opacity: 0.75,
      shape: shapes[0],
      position: positions[0],
      rules: [{ type: ruleTypes[0], value: "" }],
    },
    enhanceGetInputProps: (payload) => ({
      disabled:
        (payload.field === "textColor" || payload.field === "position") &&
        payload.form.values.shape === "frame",
    }),
    validate: {
      rules: {
        value: (value) =>
          !value.trim().length ? "The rule value can't be empty" : null,
      },
    },
  });

  //TODO: fix useEffect dependencies
  useEffect(() => {
    form.initialize({ ...form.values, ...label });
  }, [label]);

  return (
    <LabelEditFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((values) => {
          if (!label) {
            dispatch({
              type: "addLabel",
              payload: { label: { ...values, isActive: true } },
            });
          } else {
            dispatch({
              type: "updateLabel",
              payload: {
                label: { id: label.id, ...values, isActive: label.isActive },
              },
            });
          }
          if (onSave) {
            onSave();
          }
        })}
      >
        <LabelEditFormAppearance />
        <LabelEditFormRules />
        <Button
          type="submit"
          mt="md"
          leftSection={<IconDeviceFloppy size={14} />}
        >
          Save
        </Button>
      </form>
    </LabelEditFormProvider>
  );
}

export default LabelEditForm;
