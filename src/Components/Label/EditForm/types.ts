import { Label, OptionsAction } from "../../../options/types.ts";
import { Dispatch } from "react";

export interface LabelEditFormProps {
  label?: Label;
  dispatch: Dispatch<OptionsAction>;
}
