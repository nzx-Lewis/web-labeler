import { Stack, Fieldset, Flex, Text } from "@mantine/core";
import IconStyleSwitcher from "./IconStyleSwitcher";
import IconPreview from "../../IconPreview";
import { useLabelEditFormContext } from "../formContext.ts";

function LabelEditFormIcon() {
  const form = useLabelEditFormContext();

  return (
    <Flex gap="sm" wrap="wrap">
      <Fieldset
        legend="Settings"
        style={{
          flexGrow: 1,
          position: "relative",
          paddingBottom: "var(--mantine-spacing-xl)",
        }}
      >
        <Stack gap="sm">
          <Stack style={{ flexGrow: 1, gap: 0 }}>
            <Text size="sm" fw={500}>
              Favicon Styling
            </Text>
            <IconStyleSwitcher />
          </Stack>
        </Stack>
      </Fieldset>
      <Fieldset legend="Preview" style={{ flexGrow: 1 }}>
        <IconPreview label={{ ...form.getValues() }} />
      </Fieldset>
    </Flex>
  );
}

export default LabelEditFormIcon;
