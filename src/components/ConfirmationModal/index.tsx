import { Button, Group, Stack, Text } from "@mantine/core";
import { ConfirmationModalProps } from "./types.ts";
import { IconCheck, IconX } from "@tabler/icons-react";

function ConfirmationModal({
  message,
  onConfirm,
  onClose,
}: ConfirmationModalProps) {
  return (
    <Stack>
      <Text size="sm">{message || "Are you sure?"}</Text>
      <Group gap="xs" justify="end">
        <Button
          size="xs"
          onClick={onConfirm}
          leftSection={<IconCheck size={14} />}
        >
          Confirm
        </Button>
        <Button
          size="xs"
          variant="light"
          onClick={onClose}
          leftSection={<IconX size={14} />}
        >
          Cancel
        </Button>
      </Group>
    </Stack>
  );
}

export default ConfirmationModal;
