import { Dispatch } from "react";
import { StorageAction } from "../../types.ts";

export interface PopupProps {
  isActive: boolean;
  dispatch: Dispatch<StorageAction>;
}
