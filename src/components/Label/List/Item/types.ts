import { Dispatch } from "react";
import { OptionsAction } from "../../../../options/types.ts";
import { Label } from "../../../../options/types.ts";

export interface LabelListItemProps {
  dispatch: Dispatch<OptionsAction>;
  label: Label;
  index: number;
  isStatusSwitchDisabled?: boolean;
}
