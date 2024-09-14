import { Dispatch } from "react";
import { OptionsAction } from "../../../../options/types.ts";
import { Label } from "../../../../options/types.ts";

export interface ConfigurationImportProps {
  dispatch: Dispatch<OptionsAction>;
  labels: Label[];
}
