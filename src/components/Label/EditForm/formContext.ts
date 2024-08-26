import { createFormContext } from "@mantine/form";
import { Label } from "../../../options/types.ts";

// You can give context variables any name
export const [
  LabelEditFormProvider,
  useLabelEditFormContext,
  useLabelEditForm,
] = createFormContext<Omit<Label, "id" | "isActive">>();
