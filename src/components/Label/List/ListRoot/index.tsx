import { LabelListProps } from "./types.ts";
import { Table, Stack } from "@mantine/core";
import { IconArrowsSort } from "@tabler/icons-react";
import LabelListActions from "../ListActions";
import LabelListItem from "../Item";

function LabelList({
  labels,
  dispatch,
  isStatusSwitchDisabled,
}: LabelListProps) {
  return (
    <Stack>
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
        <Table.Tbody>
          {!labels?.length ? (
            <Table.Tr>
              <Table.Td colSpan={5} align="center">
                no labels
              </Table.Td>
            </Table.Tr>
          ) : (
            labels.map((label) => (
              <LabelListItem
                dispatch={dispatch}
                label={label}
                isStatusSwitchDisabled={isStatusSwitchDisabled}
              />
            ))
          )}
        </Table.Tbody>
      </Table>
      <LabelListActions
        dispatch={dispatch}
        isDeleteAllDisabled={labels.length <= 1}
      />
    </Stack>
  );
}

export default LabelList;
