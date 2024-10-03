import { Label } from "../../../options/types.ts";

export interface LabelEditFormProps {
  onSave?: () => void;
  label?: Label;
}

export type LabelEditFormValues = Omit<Label, "id" | "isActive">;
