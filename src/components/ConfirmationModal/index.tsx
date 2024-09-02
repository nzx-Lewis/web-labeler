import { Button, Group, Stack, Text } from "@mantine/core";
import { ConfirmationModalProps } from "./types.ts";

function ConfirmationModal({
  message,
  onConfirm,
  onClose,
}: ConfirmationModalProps) {
  return (
    <Stack>
      <Text size="sm">{message || "Are you sure?"}</Text>
      <Group gap="xs" justify="end">
        <Button size="xs" onClick={onConfirm}>
          Confirm
        </Button>
        <Button size="xs" variant="light" color="dark" onClick={onClose}>
          Cancel
        </Button>
      </Group>
    </Stack>
  );
}

export default ConfirmationModal;
