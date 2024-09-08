import { Badge, HoverCard, List, Switch, Table } from "@mantine/core";
import { IconGripVertical, IconTag } from "@tabler/icons-react";
import { LabelListItemProps } from "./types.ts";
import LabelListItemActions from "../ItemActions";
import { Draggable } from "@hello-pangea/dnd";

function LabelListItem({
  dispatch,
  label,
  index,
  isStatusSwitchDisabled,
}: LabelListItemProps) {
  return (
    <Draggable key={label.id} index={index} draggableId={label.id}>
      {(provided) => (
        <Table.Tr ref={provided.innerRef} {...provided.draggableProps}>
          <Table.Td>
            <div {...provided.dragHandleProps}>
              <IconGripVertical size={14} />
            </div>
          </Table.Td>
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
                <Badge size="lg" variant="default" color="gray" radius="xs">
                  {label.rules.length || "-"}
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
              disabled={isStatusSwitchDisabled}
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
            <LabelListItemActions dispatch={dispatch} label={label} />
          </Table.Td>
        </Table.Tr>
      )}
    </Draggable>
  );
}

export default LabelListItem;
