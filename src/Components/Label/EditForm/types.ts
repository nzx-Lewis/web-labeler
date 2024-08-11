import { Label, OptionsAction } from "../../../options/types.ts";
import { Dispatch } from "react";

export interface LabelEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  label?: Label;
  dispatch: Dispatch<OptionsAction>;
}
