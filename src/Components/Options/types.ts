import { Label, StorageAction } from "../../types.ts";
import { Dispatch } from "react";
export interface OptionsProps {
  labels: Label[];
  isLoading: boolean;
  isActive: boolean;
  dispatch: Dispatch<StorageAction>;
}
