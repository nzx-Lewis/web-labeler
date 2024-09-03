import { Dispatch } from "react";
import { Label, OptionsAction } from "../../../../options/types.ts";

export interface LabelListItemActionsProps {
  dispatch: Dispatch<OptionsAction>;
  label: Label;
}
