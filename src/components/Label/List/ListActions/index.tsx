import { Button, Group } from "@mantine/core";
import { IconSquareRoundedPlus, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import LabelEditForm from "../../EditForm";
import ConfirmationModal from "../../../ConfirmationModal";
import { LabelListActionsProps } from "./types.ts";

function LabelListActions({
  dispatch,
  isDeleteAllDisabled,
}: LabelListActionsProps) {
  return (
    <Group gap="xs" mt="10">
      <Button
        size="xs"
        variant="light"
        leftSection={<IconSquareRoundedPlus size={16} />}
        onClick={() => {
          modals.open({
            title: "New Label",
            size: "auto",
            children: (
              <LabelEditForm
                dispatch={dispatch}
                onSave={() => modals.closeAll()}
              />
            ),
          });
        }}
      >
        Add Label
      </Button>
      {!isDeleteAllDisabled && (
        <Button
          size="xs"
          variant="light"
          leftSection={<IconTrash size={14} />}
          onClick={() => {
            modals.open({
              title: "Delete All Labels",
              size: "auto",
              children: (
                <ConfirmationModal
                  message={`Are you sure you want to delete all labels?`}
                  onConfirm={() => {
                    dispatch({ type: "deleteAllLabels" });
                    modals.closeAll();
                  }}
                  onClose={() => modals.closeAll()}
                />
              ),
            });
          }}
        >
          Delete All
        </Button>
      )}
    </Group>
  );
}

export default LabelListActions;
