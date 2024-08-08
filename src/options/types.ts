import { ruleTypes, shapes, positions } from "./constants.ts";

export interface Label {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  ruleType: (typeof ruleTypes)[number];
  ruleValue: string;
  shape: (typeof shapes)[number];
  position: (typeof positions)[number];
}

export interface Options {
  labels: Label[];
  isActive: boolean;
}

export type OptionsAction =
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
      type: "initialize";
      payload: Options;
    };
