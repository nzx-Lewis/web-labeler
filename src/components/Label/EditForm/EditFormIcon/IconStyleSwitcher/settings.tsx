import { ReactNode } from "react";
import { IconStyle } from "../../../../../options/constants.ts";
import { IconLabel } from "@tabler/icons-react";

export const iconStyleSettings = {
  none: {
    icon: "",
    label: "None",
  },
  badge: {
    icon: <IconLabel />,
    label: "Use badge style",
  },
} as const satisfies Record<IconStyle, IconStyleSettings>;

export interface IconStyleSettings {
  icon: ReactNode;
  label: string;
}
