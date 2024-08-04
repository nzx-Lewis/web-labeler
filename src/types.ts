export interface Label {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  ruleType: "contains" | "startsWith" | "endsWith" | "matches";
  ruleValue: string;
  shape: "stripe" | "triangle";
  position: "left-top" | "right-top" | "left-bottom" | "right-bottom";
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
