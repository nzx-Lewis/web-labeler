import { Label, OptionsAction } from "../../../../options/types.ts";
import { Dispatch } from "react";

export interface LabelListCompactProps {
  labels: Label[];
  dispatch: Dispatch<OptionsAction>;
  isAllActive: boolean;
}
