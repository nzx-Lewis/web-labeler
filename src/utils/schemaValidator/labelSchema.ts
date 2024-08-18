import { Label } from "../../options/types.ts";
import { validate as uuidValidate } from "uuid";
import { isHexColor } from "../general.ts";
import { positions, ruleTypes, shapes } from "../../options/constants.ts";
import { Schema } from "./types.ts";

export const labelSchema: Schema<Label> = {
  id: (val) => typeof val === "string" && uuidValidate(val),
  name: (val) => typeof val === "string",
  bgColor: (val) => typeof val === "string" && isHexColor(val),
  textColor: (val) => typeof val === "string" && isHexColor(val),
  shape: (val) => typeof val === "string" && shapes.includes(val),
  position: (val) => typeof val === "string" && positions.includes(val),
  rules: (val) =>
    Array.isArray(val) &&
    val.filter(
      (item) =>
        ruleTypes.includes(item?.type) && typeof item?.value === "string",
    ).length === 0,
  opacity: (val) => typeof val === "number" && val > 0 && val < 1,
  isActive: (val) => typeof val === "boolean",
};
