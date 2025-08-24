import {
    IconLineDashed,
    IconLineDotted,
    IconMinus,
} from "@tabler/icons-react";
import {Border} from "../../../../../options/constants.ts";
import {ReactNode} from "react";

export const borderSettings = {
    "none": {
        icon: <></>,
    },
    "solid": {
        icon: <IconMinus/>,
    },
    "dashed": {
        icon: <IconLineDashed/>,
    },
    "dotted": {
        icon: <IconLineDotted/>,
    },
} as const satisfies Record<Border, BorderSettings>;

export interface BorderSettings {
    icon: ReactNode;
}