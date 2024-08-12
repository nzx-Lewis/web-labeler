import { LabelListProps } from "./types.ts";
import {
  Badge,
  Group,
  Table,
  Button,
  Stack,
  Switch,
  HoverCard,
  List,
} from "@mantine/core";
import {
  IconEdit,
  IconInfoCircle,
  IconPlus,
  IconTag,
  IconTrash,
} from "@tabler/icons-react";
import LabelEditForm from "../EditForm";
import { useState } from "react";
import { Label } from "../../../options/types.ts";

function LabelList({ labels, dispatch }: LabelListProps) {
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const editLabelHandler = (label: Label) => {
    setSelectedLabel({ ...label });
  };

  const addLabelHandler = () => {
    setIsEditFormOpen(true);
  };

  const onCloseEditForm = () => {
    setSelectedLabel(null);
    setIsEditFormOpen(false);
  };

  return (
    <Stack>
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Label Name</Table.Th>
            <Table.Th>Rules</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {!labels.length ? (
            <Table.Tr>
              <Table.Td colSpan={4} align="center">
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
                  <HoverCard shadow="md">
                    <HoverCard.Target>
                      <Badge
                        size="lg"
                        variant="default"
                        color="gray"
                        radius="xs"
                        leftSection={
                          !!label.rules.length && <IconInfoCircle size={14} />
                        }
                      >
                        {label.rules.length}
                      </Badge>
                    </HoverCard.Target>
                    {!!label.rules.length && (
                      <HoverCard.Dropdown>
                        <List size="xs" icon={<IconTag size={14} />} center>
                          {label.rules.map((rule) => (
                            <List.Item>
                              {rule.type}: {rule.value}
                            </List.Item>
                          ))}
                        </List>
                      </HoverCard.Dropdown>
                    )}
                  </HoverCard>
                </Table.Td>
                <Table.Td>
                  <Switch
                    checked={label.isActive}
                    onChange={() => {
                      dispatch({
                        type: "toggleLabelStatus",
                        payload: { id: label.id },
                      });
                    }}
                  />
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
        isOpen={isEditFormOpen || !!selectedLabel}
        onClose={onCloseEditForm}
        dispatch={dispatch}
        {...(selectedLabel ? { label: selectedLabel } : {})}
      ></LabelEditForm>
    </Stack>
  );
}

export default LabelList;
