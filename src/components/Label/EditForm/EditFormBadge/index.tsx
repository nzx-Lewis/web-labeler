import {
  ColorInput,
  Group,
  Input,
  Slider,
  Stack,
  Fieldset,
  Textarea,
  Flex,
  Text,
  Collapse,
} from "@mantine/core";
import { colorSwatches } from "../../../../options/constants.ts";
import BadgePreview from "../../BadgePreview";
import { useLabelEditFormContext } from "../formContext.ts";
import PositionControls from "./PositionControls";
import ShapeSwitcher from "./ShapeSwitcher";
import BorderSwitcher from "./BorderSwitcher";
import { useDisclosure } from "@mantine/hooks";
import CollapseButton from "./CollapseButton";
import { useEffect } from "react";

function LabelEditFormBadge() {
  const form = useLabelEditFormContext();
  const [expanded, { toggle, open }] = useDisclosure(false);

  useEffect(() => {
    if (form.values.border !== "none" && form.values.shape !== "frame") {
      open();
    }
  }, [form.values.border, open]);

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
          <Textarea
            label="Name"
            placeholder="Name"
            key={form.key("name")}
            {...form.getInputProps("name")}
            minRows={1}
            maxRows={3}
          />

          <Stack style={{ flexGrow: 1, gap: 0 }}>
            <Text size="sm" fw={500}>
              Shape
            </Text>
            <ShapeSwitcher />
          </Stack>

          <Group gap="xs" grow wrap="nowrap">
            <ColorInput
              label="Background color"
              placeholder="Background color"
              swatchesPerRow={colorSwatches.length}
              swatches={[...colorSwatches]}
              key={form.key("bgColor")}
              {...form.getInputProps("bgColor")}
            />
            <ColorInput
              label="Text color"
              placeholder="Text color"
              swatchesPerRow={colorSwatches.length}
              swatches={[...colorSwatches]}
              key={form.key("textColor")}
              {...form.getInputProps("textColor")}
            />
          </Group>

          <Stack style={{ flexGrow: 1, gap: 0 }}>
            <Text size="sm" fw={500}>
              Fade After (seconds)
            </Text>
            <Input
              placeholder="e.g. 60"
              type="number"
              min={0}
              key={form.key("fadeAfter")}
              {...form.getInputProps("fadeAfter")}
            />
          </Stack>

          <Group gap="xs" grow>
            <Input.Wrapper label="Opacity">
              <Slider
                color="gray"
                label={(value) => `${Math.round(value * 100)}%`}
                min={0.1}
                max={1}
                step={0.05}
                key={form.key("opacity")}
                {...form.getInputProps("opacity")}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Hovered Opacity">
              <Slider
                color="gray"
                label={(value) => `${Math.round(value * 100)}%`}
                min={0}
                max={1}
                step={0.05}
                key={form.key("hoveredOpacity")}
                {...form.getInputProps("hoveredOpacity")}
              />
            </Input.Wrapper>
          </Group>

          <Group gap="xs" grow>
            <Input.Wrapper label="Scale">
              <Slider
                color="gray"
                min={0.5}
                max={3}
                step={0.05}
                key={form.key("scale")}
                {...form.getInputProps("scale")}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Font Size">
              <Slider
                color="gray"
                label={(value) => `${value.toFixed(1)}px`}
                min={10}
                max={90}
                step={0.1}
                key={form.key("fontSize")}
                {...form.getInputProps("fontSize")}
              />
            </Input.Wrapper>
          </Group>

          <Collapse in={expanded}>
            <Stack style={{ flexGrow: 1, gap: 0 }}>
              <Text size="sm" fw={500}>
                Border
              </Text>
              <BorderSwitcher />
            </Stack>

            <Group gap="xs" grow>
              <ColorInput
                label="Border color"
                placeholder="Border color"
                swatchesPerRow={colorSwatches.length}
                swatches={[...colorSwatches]}
                key={form.key("borderColor")}
                {...form.getInputProps("borderColor")}
              />
              <Input.Wrapper label="Border Width">
                <Slider
                  color="gray"
                  min={0.5}
                  max={5}
                  step={0.5}
                  key={form.key("borderWidth")}
                  {...form.getInputProps("borderWidth")}
                />
              </Input.Wrapper>
            </Group>
          </Collapse>
        </Stack>
        <CollapseButton expanded={expanded} toggle={toggle} />
      </Fieldset>
      <Fieldset legend="Preview" style={{ flexGrow: 1 }}>
        <BadgePreview label={{ ...form.getValues() }}>
          <PositionControls
            mode={form.values.shape === "banner" ? "sides" : "corners"}
          />
        </BadgePreview>
      </Fieldset>
    </Flex>
  );
}

export default LabelEditFormBadge;
