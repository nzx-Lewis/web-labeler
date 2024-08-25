import { Dispatch } from "react";
import { OptionsAction } from "./../../options/types.ts";

export interface PopupProps {
  isActive: boolean;
  dispatch: Dispatch<OptionsAction>;
}
