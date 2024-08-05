export type RuleTypes = ["contains", "startsWith", "endsWith", "matches"];
export type Shapes = ["stripe", "triangle"];
export type Positions = [
  "left-top",
  "right-top",
  "left-bottom",
  "right-bottom",
];

export interface Label {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  ruleType: RuleTypes[number];
  ruleValue: string;
  shape: Shapes[number];
  position: Positions[number];
}

export interface Storage {
  isLoading: boolean;
  labels: Label[];
  isActive: boolean;
}

export type StorageAction =
  | {
      type: "addLabel";
      payload: { label: Label };
    }
  | {
      type: "updateLabel";
      payload: { label: Label };
    }
  | {
      type: "deleteLabel";
      payload: { labelId: string };
    }
  | {
      type: "toggleActive";
      payload?: { force: true };
    }
  | {
      type: "setStorage";
      payload: Storage;
    };
