import { LabelListProps } from "./types.ts";
import { Badge, Group, Table, Button, Stack } from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import LabelEditForm from "../EditForm";
import { useState } from "react";
import { Label } from "../../../options/types.ts";

function LabelList({ labels, dispatch }: LabelListProps) {
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const editLabelHandler = (label: Label) => {
    setSelectedLabel(label);
    setIsEditFormOpen(true);
  };

  const addLabelHandler = () => {
    setIsEditFormOpen(true);
  };

  const onCloseEditForm = () => {
    //setSelectedLabel(null);
    setIsEditFormOpen(false);
  };

  return (
    <Stack>
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Label Name</Table.Th>
            <Table.Th>Rule</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {!labels.length ? (
            <Table.Tr>
              <Table.Td colSpan={3} align="center">
                no labels
              </Table.Td>
            </Table.Tr>
          ) : (
            labels.map((label) => (
              <Table.Tr>
                <Table.Td>
                  <Badge
                    size="md"
                    p={12}
                    color={label.bgColor}
                    style={{ "--badge-color": label.textColor }}
                  >
                    {label.name || "[noname]"}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  {label.ruleType} - {label.ruleValue}
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Button
                      size="xs"
                      variant="light"
                      leftSection={<IconEdit size={14} />}
                      onClick={() => {
                        editLabelHandler(label);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      variant="light"
                      leftSection={<IconTrash size={14} />}
                      onClick={() => {
                        dispatch({
                          type: "deleteLabel",
                          payload: { id: label.id },
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>

      <Group gap="xs" mt="10">
        <Button
          size="xs"
          variant="light"
          leftSection={<IconPlus size={14} />}
          onClick={addLabelHandler}
        >
          Add Label
        </Button>
        {labels.length > 1 && (
          <Button
            size="xs"
            variant="light"
            color="dark"
            leftSection={<IconTrash size={14} />}
            onClick={() => {
              dispatch({ type: "deleteAllLabels" });
            }}
          >
            Delete All
          </Button>
        )}
      </Group>

      <LabelEditForm
        isOpen={isEditFormOpen}
        onClose={onCloseEditForm}
        dispatch={dispatch}
        {...(selectedLabel ? { label: selectedLabel } : {})}
      ></LabelEditForm>
    </Stack>
  );
}

export default LabelList;
