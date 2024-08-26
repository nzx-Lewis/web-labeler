import {
  ColorInput,
  Group,
  Input,
  SegmentedControl,
  Slider,
  Stack,
  TextInput,
  Fieldset,
} from "@mantine/core";
import {
  colorSwatches,
  positions,
  shapes,
} from "../../../../options/constants.ts";
import LabelPreview from "../../Preview";
import { useLabelEditFormContext } from "../formContext.ts";

function LabelEditFormAppearance() {
  const form = useLabelEditFormContext();

  return (
    <Fieldset legend="Appearance & Position">
      <Group align="stretch" wrap="nowrap">
        <Stack gap="xs" style={{ width: "400px" }}>
          <TextInput
            label="Name"
            placeholder="Name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
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

          <SegmentedControl
            data={[...shapes]}
            key={form.key("shape")}
            {...form.getInputProps("shape")}
          />

          <SegmentedControl
            data={[...positions]}
            key={form.key("position")}
            {...form.getInputProps("position")}
          />
        </Stack>
        <LabelPreview label={{ ...form.getValues() }} />
      </Group>
    </Fieldset>
  );
}

export default LabelEditFormAppearance;
