import { createFormContext } from "@mantine/form";
import { LabelEditFormValues } from "./types.ts";

// You can give context variables any name
export const [
  LabelEditFormProvider,
  useLabelEditFormContext,
  useLabelEditForm,
] = createFormContext<LabelEditFormValues>();
