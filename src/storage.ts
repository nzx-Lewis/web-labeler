import { Storage, StorageAction } from "./types.ts";

export const reducer = (storage: Storage, action: StorageAction) => {
  switch (action.type) {
    case "addLabel":
      return storage;
    case "updateLabel":
      return storage;
    case "deleteLabel":
      return storage;
    case "toggleActive":
      return {
        ...storage,
        isActive:
          typeof action.payload?.force !== "undefined"
            ? action.payload?.force
            : !storage.isActive,
      };
    case "setStorage":
      return action.payload;
  }

  //chrome.storage.sync.set(storage);
};
