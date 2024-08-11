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

export type LabelWithoutId = Omit<Label, "id">;

export interface Options {
  labels: Label[];
  isActive: boolean;
}

export type OptionsAction =
  | {
      type: "addLabel";
      payload: { label: LabelWithoutId };
    }
  | {
      type: "updateLabel";
      payload: { label: Label };
    }
  | {
      type: "deleteLabel";
      payload: Pick<Label, "id">;
    }
  | {
      type: "toggleActive";
      payload?: { force: true };
    }
  | {
      type: "deleteAllLabels";
    }
  | {
      type: "initialize";
      payload: Options;
    };
