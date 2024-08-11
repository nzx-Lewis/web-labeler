import { MantineProvider } from "@mantine/core";
import Popup from "./Components/Popup";
import OptionsPage from "./Components/OptionsPage";
import { optionsReducer } from "./options/options.ts";
import { usePersistentReducer } from "./Hooks/PersistedReducer";
import { Options, OptionsAction } from "./options/types.ts";
import "@mantine/core/styles.css";
import "./style.scss";

function App() {
  const {
    state: options,
    isInitialized: isReady,
    dispatch,
  } = usePersistentReducer<Options, OptionsAction>(
    optionsReducer,
    {
      labels: [],
      isActive: false,
    },
    "options",
  );

  return (
    <MantineProvider>
      {isReady &&
        (window.location.hash === "#popup" ? (
          <Popup isActive={options.isActive} dispatch={dispatch} />
        ) : (
          <OptionsPage options={options} dispatch={dispatch} />
        ))}
    </MantineProvider>
  );
}

export default App;
