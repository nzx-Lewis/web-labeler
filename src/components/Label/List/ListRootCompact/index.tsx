import { Badge, Group, Stack, Switch } from "@mantine/core";
import { LabelListCompactProps } from "./types.ts";

function LabelListCompact({
  labels,
  dispatch,
  isAllActive,
}: LabelListCompactProps) {
  return (
    <Stack gap="xs">
      {labels.map((label) => (
        <Group wrap="nowrap" gap="xs" justify="space-between">
          <Badge
            size="sm"
            p={10}
            color={label.bgColor}
            style={{ "--badge-color": label.textColor }}
          >
            {label.name || "[noname]"}
          </Badge>
          <Switch
            size="xs"
            disabled={!isAllActive}
            checked={label.isActive}
            onChange={() => {
              dispatch({
                type: "toggleLabelStatus",
                payload: { id: label.id },
              });
            }}
          />
        </Group>
      ))}
    </Stack>
  );
}

export default LabelListCompact;
