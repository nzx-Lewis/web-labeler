import { Dispatch } from "react";
import { OptionsAction } from "./../../options/types.ts";
import { Options } from "../../options/types.ts";

export interface PopupProps {
  options: Options;
  dispatch: Dispatch<OptionsAction>;
}
