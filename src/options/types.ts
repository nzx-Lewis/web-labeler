import { ruleTypes, Position, Shape, Border, IconStyle } from "./constants.ts";

export interface Label {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  opacity: number;
  rules: Rule[];
  shape: Shape;
  position: Position;
  isActive: boolean;

  fadeAfter?: number;
  hoveredOpacity?: number;
  fontSize?: number;
  scale?: number;

  border?: Border;
  borderColor?: string;
  borderWidth?: number;

  iconStyle?: IconStyle;
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
      type: "mergeLabels";
      payload: { labels: (Omit<Label, "id"> & Partial<Pick<Label, "id">>)[] };
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
