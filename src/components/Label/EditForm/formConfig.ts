import {
  colorSwatches,
  positions,
  ruleTypes,
  shapes,
} from "../../../options/constants.ts";
import { UseFormInput } from "@mantine/form";
import { LabelEditFormValues } from "./types.ts";

export const editLabelFormInput: UseFormInput<LabelEditFormValues> = {
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
};
