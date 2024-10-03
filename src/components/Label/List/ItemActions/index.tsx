import { Button, Group } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import LabelEditForm from "../../EditForm";
import ConfirmationModal from "../../../ConfirmationModal";
import { LabelListItemActionsProps } from "./types.ts";
import { useOptionsContext } from "../../../../hooks/useOptionsContext";

function LabelListItemActions({ label }: LabelListItemActionsProps) {
  const { dispatch } = useOptionsContext();

  return (
    <Group gap="xs">
      <Button
        size="xs"
        variant="light"
        leftSection={<IconEdit size={14} />}
        onClick={() => {
          modals.open({
            title: "Edit label",
            size: "auto",
            children: (
              <LabelEditForm label={label} onSave={() => modals.closeAll()} />
            ),
          });
        }}
      >
        Edit
      </Button>
      <Button
        size="xs"
        variant="light"
        leftSection={<IconTrash size={14} />}
        onClick={() => {
          modals.open({
            title: "Delete Label",
            size: "auto",
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
        Delete
      </Button>
    </Group>
  );
}

export default LabelListItemActions;
