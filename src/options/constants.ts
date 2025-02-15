export const ruleTypes: string[] = [
    "contains",
    "startsWith",
    "endsWith",
    "matches",
] as const;

export const shapes = ["triangle", "ribbon", "frame"] as const;

export type Shape = (typeof shapes)[number];

export const positions = [
    "left-top",
    "right-top",
    "left-bottom",
    "right-bottom",
] as const;

export type Position = (typeof positions)[number];

export const colorSwatches = [
    "#fa5252",
    "#e64980",
    "#40c057",
    "#82c91e",
    "#fab005",
    "#fd7e14",
    "#000000",
    "#ffffff",
] as const;
