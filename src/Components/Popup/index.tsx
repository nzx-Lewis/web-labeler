import { Button, Container, Group, Switch } from "@mantine/core";
import { PopupProps } from "./types.ts";

function Popup({ isActive, dispatch }: PopupProps) {
  return (
    <Container p={15}>
      <Group justify="center">
        <Switch
          size="lg"
          onLabel="ON"
          offLabel="OFF"
          checked={isActive}
          onChange={() => {
            dispatch({ type: "toggleActive" });
          }}
        />
        <Button
          size="compact-sm"
          color="gray"
          onClick={() => {
            chrome.runtime.openOptionsPage();
          }}
        >
          Go to Options
        </Button>
      </Group>
    </Container>
  );
}

export default Popup;
