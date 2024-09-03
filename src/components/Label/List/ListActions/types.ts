import { Dispatch } from "react";
import { OptionsAction } from "../../../../options/types.ts";

export interface LabelListActionsProps {
  dispatch: Dispatch<OptionsAction>;
  isDeleteAllDisabled?: boolean;
}
