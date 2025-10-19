import {
  IconLayoutNavbarFilled,
  IconRectangleFilled,
  IconRibbonHealth,
  IconSquareDashed,
  IconTriangle,
} from "@tabler/icons-react";
import { Shape } from "../../../../../options/constants.ts";
import { ReactNode } from "react";

export const shapeSettings = {
  triangle: {
    icon: <IconTriangle />,
  },
  ribbon: {
    icon: <IconRibbonHealth />,
  },
  banner: {
    icon: <IconLayoutNavbarFilled />,
  },
  block: {
    icon: <IconRectangleFilled />,
  },
  frame: {
    icon: <IconSquareDashed />,
  },
} as const satisfies Record<Shape, ShapeSettings>;

export interface ShapeSettings {
  icon: ReactNode;
}
