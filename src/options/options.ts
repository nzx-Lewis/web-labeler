import { Options, OptionsAction } from "./types.ts";

export const optionsReducer = (options: Options, action: OptionsAction) => {
  switch (action?.type) {
    case "addLabel":
      return options;
    case "updateLabel":
      return options;
    case "deleteLabel":
      return options;
    case "toggleActive":
      return {
        ...options,
        isActive:
          typeof action.payload?.force !== "undefined"
            ? action.payload?.force
            : !options.isActive,
      };
    case "initialize":
      return action.payload;
  }
};
