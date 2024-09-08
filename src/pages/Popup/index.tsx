import {
  Button,
  Container,
  Group,
  Image,
  Stack,
  Switch,
  Title,
} from "@mantine/core";
import { PopupProps } from "./types.ts";
import { IconSettings } from "@tabler/icons-react";
import { LabelListCompact } from "../../components/Label/List";

function Popup({ options, dispatch }: PopupProps) {
  return (
    <Container p={15}>
      <Stack gap="xl">
        <Group wrap="nowrap" justify="space-between">
          <Group wrap="nowrap" gap="xs">
            <Image src="/icon/icon-16.png" />
            <Title order={1} size="h5">
              WebLabeler
            </Title>
          </Group>
          <Group wrap="nowrap" gap="xs">
            <Switch
              size="sm"
              onLabel="ON"
              offLabel="OFF"
              checked={options.isActive}
              onChange={() => {
                dispatch({ type: "toggleActive" });
              }}
            />
          </Group>
        </Group>

        <LabelListCompact
          labels={options.labels}
          dispatch={dispatch}
          isAllActive={options.isActive}
        />
        <Group gap="xs">
          <Button
            size="xs"
            fullWidth
            variant="default"
            leftSection={<IconSettings size={16} />}
            onClick={() => {
              chrome.runtime.openOptionsPage();
            }}
          >
            Manage All Labels
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}

export default Popup;
