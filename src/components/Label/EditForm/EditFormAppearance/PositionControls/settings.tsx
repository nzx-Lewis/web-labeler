import { Position } from "../../../../../options/constants.ts";
import { CSSProperties, ReactNode } from "react";
import {
  IconArrowUpLeft,
  IconArrowUpRight,
  IconArrowDownLeft,
  IconArrowDownRight,
} from "@tabler/icons-react";

export const positionSettings = {
  "left-top": {
    icon: <IconArrowUpLeft />,
    style: { position: "absolute", top: 0, left: 0 },
  },
  "right-top": {
    icon: <IconArrowUpRight />,
    style: { position: "absolute", top: 0, right: 0 },
  },
  "left-bottom": {
    icon: <IconArrowDownLeft />,
    style: { position: "absolute", bottom: 0, left: 0 },
  },
  "right-bottom": {
    icon: <IconArrowDownRight />,
    style: { position: "absolute", bottom: 0, right: 0 },
  },
} as const satisfies Record<Position, PositionSettings>;

export interface PositionSettings {
  icon: ReactNode;
  style: CSSProperties;
}
