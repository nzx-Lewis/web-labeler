export const ruleTypes: string[] = [
  "contains",
  "startsWith",
  "endsWith",
  "matches",
] as const;

export const shapes = ["triangle", "ribbon", "banner", "block", "frame"] as const;

export type Shape = (typeof shapes)[number];

export const positions = [
  "left-top",
  "right-top",
  "left-bottom",
  "right-bottom",
] as const;

export type Position = (typeof positions)[number];

// export const colorSwatches = [
//   "#fa5252",
//   "#e64980",
//   "#40c057",
//   "#82c91e",
//   "#fab005",
//   "#fd7e14",
//   "#000000",
//   "#ffffff",
// ] as const;

export const colorSwatches = [
  "#287271",
  "#2A9D8F",
  "#fab005",
  "#f77f00",
  "#d62828",
  "#000000",
  "#ffffff",
] as const;



export const borders = ["none", "solid", "dashed", "dotted"] as const;
export type Border = (typeof borders)[number];

export const iconStyles = ["none", "badge"] as const;
export type IconStyle = (typeof iconStyles)[number];
