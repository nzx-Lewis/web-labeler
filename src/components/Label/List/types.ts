import { Label, OptionsAction } from "../../../options/types.ts";
import { Dispatch } from "react";

export interface LabelListProps {
  labels: Label[];
  dispatch: Dispatch<OptionsAction>;
  isStatusSwitchDisabled?: boolean;
}
