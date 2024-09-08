import { ruleTypes, shapes, positions } from "./constants.ts";

export interface Label {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  opacity: number;
  rules: Rule[];
  shape: (typeof shapes)[number];
  position: (typeof positions)[number];
  isActive: boolean;
}

export interface Rule {
  type: (typeof ruleTypes)[number];
  value: string;
}

export interface Options {
  labels: Label[];
  isActive: boolean;
}

export type OptionsAction =
  | {
      type: "addLabel";
      payload: { label: Omit<Label, "id"> };
    }
  | {
      type: "updateLabel";
      payload: { label: Label };
    }
  | {
      type: "toggleLabelStatus";
      payload: Pick<Label, "id">;
    }
  | {
      type: "deleteLabel";
      payload: Pick<Label, "id">;
    }
  | {
      type: "reorderLabels";
      payload: {
        sourceIndex: number;
        destinationIndex: number;
      };
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
