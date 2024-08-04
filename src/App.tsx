import { MantineProvider } from "@mantine/core";
import Popup from "./Components/Popup";
import Options from "./Components/Options";
import { useEffect, useReducer } from "react";
import { reducer } from "./storage.ts";
import "@mantine/core/styles.css";

function App() {
  const [{ labels, isLoading, isActive }, dispatch] = useReducer(reducer, {
    isLoading: true,
    labels: [],
    isActive: false,
  });

  useEffect(() => {
    (async () => {
      const storage = await chrome.storage.sync.get();
      dispatch({
        type: "setStorage",
        payload: {
          isLoading: false,
          labels: storage?.labels || [],
          isActive: storage?.isActive || false,
        },
      });
    })();
  }, []);

  return (
    <MantineProvider>
      {window.location.hash === "#popup" ? (
        <Popup isActive={isActive} dispatch={dispatch} />
      ) : (
        <Options labels={labels} isLoading={isLoading} />
      )}
    </MantineProvider>
  );
}

export default App;
