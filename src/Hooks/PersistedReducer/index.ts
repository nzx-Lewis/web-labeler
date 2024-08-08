import React, { useCallback, useEffect, useReducer, useState } from "react";

interface resetAction<State> {
  type: "initialize";
  payload: State;
}

export function usePersistentReducer<State, Action>(
  reducer: (state: State, action: Action | resetAction<State>) => State,
  initialState: State,
  storageKey: string,
): { state: State; dispatch: React.Dispatch<Action>; isInitialized: boolean } {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeStorage = useCallback(async () => {
    const storage = await chrome.storage.sync.get(storageKey);
    if (typeof storage?.[storageKey] !== "undefined") {
      dispatch({
        type: "initialize",
        payload: storage?.[storageKey] as State,
      });
    }
    setIsInitialized(true);
  }, [storageKey]);

  useEffect(() => {
    initializeStorage();
  }, [initializeStorage]);

  useEffect(() => {
    if (isInitialized) {
      chrome.storage.sync.set({ [storageKey]: state });
    }
  }, [state, isInitialized, storageKey]);

  return { state, isInitialized, dispatch };
}
