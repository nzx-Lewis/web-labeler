import { OptionsContext } from "../../options/context.tsx";
import { useContext } from "react";

export const useOptionsContext = () => {
  const optionsContext = useContext(OptionsContext);

  if (optionsContext === undefined) {
    throw new Error("useOptionsContext should be used with UseOptionsProvider");
  }

  return optionsContext;
};
