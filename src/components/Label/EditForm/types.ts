import { Label, OptionsAction } from "../../../options/types.ts";
import { Dispatch } from "react";

export interface LabelEditFormProps {
  onSave?: () => void;
  label?: Label;
  dispatch: Dispatch<OptionsAction>;
}

export type LabelEditFormValues = Omit<Label, "id" | "isActive">;
