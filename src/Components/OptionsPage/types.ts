import { Options, OptionsAction } from "../../options/types.ts";
import { Dispatch } from "react";
export interface OptionsPageProps {
  options: Options;
  dispatch: Dispatch<OptionsAction>;
}
