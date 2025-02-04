import { Button, Group } from "@mantine/core";
import { IconResize, IconTextGrammar, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import LabelEditForm from "../../EditForm";
import ConfirmationModal from "../../../ConfirmationModal";
import { LabelListItemActionsProps } from "./types.ts";
import { useOptionsContext } from "../../../../hooks/useOptionsContext";
import { LabelEditFormSection } from "../../EditForm/types.ts";

function LabelListItemActions({ label }: LabelListItemActionsProps) {
  const { dispatch } = useOptionsContext();

  return (
    <Group gap="xs">
      <Button
        size="xs"
        variant="light"
        leftSection={<IconResize size={14} />}
        onClick={() => {
          modals.open({
            title: "Edit Label Appearance",
            size: "auto",
            children: (
              <LabelEditForm
                label={label}
                section={LabelEditFormSection.Appearance}
                onSave={() => modals.closeAll()}
              />
            ),
          });
        }}
      >
        Appearance
      </Button>
      <Button
        size="xs"
        variant="light"
        leftSection={<IconTextGrammar size={14} />}
        onClick={() => {
          modals.open({
            title: "Edit Label Rules",
            size: "lg",
            children: (
              <LabelEditForm
                label={label}
                section={LabelEditFormSection.Rules}
                onSave={() => modals.closeAll()}
              />
            ),
          });
        }}
      >
        Rules
      </Button>
      <Button
        size="xs"
        variant="light"
        leftSection={<IconTrash size={14} />}
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
        Delete
      </Button>
    </Group>
  );
}

export default LabelListItemActions;
