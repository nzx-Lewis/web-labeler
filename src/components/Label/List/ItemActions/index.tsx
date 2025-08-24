import { ActionIcon, Group, Switch } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import ConfirmationModal from "../../../ConfirmationModal";
import { LabelListItemActionsProps } from "./types.ts";
import { useOptionsContext } from "../../../../hooks/useOptionsContext";

function LabelListItemActions({
  label,
  isAllActive,
}: LabelListItemActionsProps) {
  const { dispatch } = useOptionsContext();

  return (
    <Group gap="xs">
      <Switch
        disabled={!isAllActive}
        checked={label.isActive}
        onChange={() => {
          dispatch({
            type: "toggleLabelStatus",
            payload: { id: label.id },
          });
        }}
      />
      <ActionIcon
        size="md"
        radius="xl"
        variant="light"
        onClick={() => {
          modals.open({
            title: "Delete Label",
            size: "lg",
            children: (
              <ConfirmationModal
                message={`Are you sure you want to delete the label "${label.name || "[noname]"}"?`}
                onConfirm={() => {
                  dispatch({
                    type: "deleteLabel",
                    payload: { id: label.id },
                  });
                  modals.closeAll();
                }}
                onClose={() => modals.closeAll()}
              />
            ),
          });
        }}
      >
        <IconTrash size={14} />
      </ActionIcon>
    </Group>
  );
}

export default LabelListItemActions;
