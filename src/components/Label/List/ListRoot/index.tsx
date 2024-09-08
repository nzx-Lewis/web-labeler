import { LabelListProps } from "./types.ts";
import { Table, Stack } from "@mantine/core";
import { IconArrowsSort } from "@tabler/icons-react";
import LabelListActions from "../ListActions";
import LabelListItem from "../Item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function LabelList({ labels, dispatch, isAllActive }: LabelListProps) {
  return (
    <Stack>
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          if (destination?.index !== undefined) {
            dispatch({
              type: "reorderLabels",
              payload: {
                sourceIndex: source.index,
                destinationIndex: destination.index,
              },
            });
          }
        }}
      >
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <IconArrowsSort size={14} />
              </Table.Th>
              <Table.Th>Label Name</Table.Th>
              <Table.Th>Rules</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Droppable droppableId="label-list" direction="vertical">
            {(provided) => (
              <Table.Tbody {...provided.droppableProps} ref={provided.innerRef}>
                {!labels?.length ? (
                  <Table.Tr>
                    <Table.Td colSpan={5} align="center">
                      no labels
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  labels.map((label, index) => (
                    <LabelListItem
                      key={label.id}
                      dispatch={dispatch}
                      label={label}
                      index={index}
                      isAllActive={isAllActive}
                    />
                  ))
                )}
                {provided.placeholder}
              </Table.Tbody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
      <LabelListActions
        dispatch={dispatch}
        isDeleteAllDisabled={labels.length <= 1}
      />
    </Stack>
  );
}

export default LabelList;
