import { Label, OptionsAction } from "../../../options/types";
import { Dispatch } from "react";

export interface ConfigurationManagerProps {
  labels: Label[];
  dispatch: Dispatch<OptionsAction>;
}
