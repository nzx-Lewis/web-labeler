import { Position } from "../../../../../options/constants.ts";
import { PositionSettings, positionSettings } from "./settings.tsx";
import { ActionIcon } from "@mantine/core";
import { useLabelEditFormContext } from "../../formContext.ts";

const PositionControls = () => {
  const {
    values: { position },
    setValues,
  } = useLabelEditFormContext();

  const handlePositionClick = (position: Position) => () => {
    setValues({ position });
  };

  return (
    <>
      {Object.entries(positionSettings).map(([key, settings]) => {
        const positionValue = key as Position;
        const { icon, style } = settings as PositionSettings;

        return (
          <ActionIcon
            variant="default"
            style={{
              ...style,
              ...(positionValue === position ? { visibility: "hidden" } : {}),
            }}
            aria-label={`Place label to ${positionValue} position`}
            onClick={handlePositionClick(positionValue)}
          >
            {icon}
          </ActionIcon>
        );
      })}
    </>
  );
};

export default PositionControls;
