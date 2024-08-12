import { MantineProvider } from "@mantine/core";
import Popup from "./Components/Popup";
import OptionsPage from "./Components/OptionsPage";
import { optionsReducer } from "./options/options.ts";
import { usePersistentReducer } from "./Hooks/PersistedReducer";
import { Options, OptionsAction } from "./options/types.ts";
import "@mantine/core/styles.css";
import "./style.scss";

//TODO:
// 1. Opacity and isActive props for Labels
// 2. Multi rules for one label
// 3. Default labels (for first launch)
// 4. Label preview in edit form
// 5. Import/export setting from file
// 6. Import setting from url
// 6.1 By user action (sync button)
// 6.2 By timer (autoupdate)
// 7. Draggable labels in the list
// 8. UI improvements:
// 8.1 user friendly position selector in the edit form,
// 8.2 ribbon/triangle icons for labels in the edit form and in the labels' badges

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
