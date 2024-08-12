import {
  Button,
  ColorInput,
  Fieldset,
  Modal,
  SegmentedControl,
  Text,
  TextInput,
  Slider,
  Stack,
  Input,
  Switch,
} from "@mantine/core";
import {
  colorSwatches,
  positions,
  ruleTypes,
  shapes,
} from "../../../options/constants.ts";
import { useForm } from "@mantine/form";
import { LabelEditFormProps } from "./types.ts";
import { LabelWithoutId } from "../../../options/types.ts";
import { useEffect } from "react";

function LabelEditForm({
  isOpen,
  onClose,
  label,
  dispatch,
}: LabelEditFormProps) {
  const form = useForm<LabelWithoutId>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      bgColor: colorSwatches[0],
      textColor: colorSwatches[colorSwatches.length - 1],
      opacity: 0.75,
      shape: shapes[0],
      position: positions[0],
      ruleType: ruleTypes[0],
      ruleValue: "*",
      isActive: true,
    },
    validate: {
      ruleValue: (value) => {
        return !value.trim().length ? "The rule value can't be empty" : null;
      },
    },
  });

  useEffect(() => {
    if (label) {
      form.setValues(label);
    } else {
      form.reset();
    }
  }, [label]);

  return (
    <Modal
      opened={isOpen}
      title={label ? "Edit Label" : "New Label"}
      onClose={onClose}
      centered
    >
      <form
        onSubmit={form.onSubmit((values) => {
          if (!label) {
            dispatch({ type: "addLabel", payload: { label: { ...values } } });
          } else {
            dispatch({
              type: "updateLabel",
              payload: { label: { id: label.id, ...values } },
            });
          }
          onClose();
        })}
      >
        <Fieldset legend="Appearance & Position">
          <Stack gap="xs">
            <TextInput
              label="Name"
              placeholder="Name"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
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

            <Input.Wrapper label="Opacity">
              <Slider
                color="blue"
                label={(value) => `${value * 100}%`}
                min={0.1}
                max={1}
                step={0.05}
                key={form.key("opacity")}
                {...form.getInputProps("opacity")}
              />
            </Input.Wrapper>

            <Input.Wrapper label={<Input.Label pr="md">Shape</Input.Label>}>
              <SegmentedControl
                data={[...shapes]}
                key={form.key("shape")}
                {...form.getInputProps("shape")}
              />
            </Input.Wrapper>

            <Input.Wrapper label="Position">
              <SegmentedControl
                data={[...positions]}
                key={form.key("position")}
                {...form.getInputProps("position")}
              />
            </Input.Wrapper>
          </Stack>
        </Fieldset>

        <Fieldset legend="Rules" mt="md">
          <Stack gap="xs">
            <Text size="sm" fw={500} mt={3}>
              Rule type for URL
            </Text>
            <SegmentedControl
              data={[...ruleTypes]}
              key={form.key("ruleType")}
              {...form.getInputProps("ruleType")}
            />
            <TextInput
              label="Rule value"
              placeholder="Rule value"
              key={form.key("ruleValue")}
              {...form.getInputProps("ruleValue")}
            />
          </Stack>
        </Fieldset>

        <Fieldset legend="Status" mt="md">
          <Switch
            label="Active/Disabled"
            key={form.key("isActive")}
            {...form.getInputProps("isActive", { type: "checkbox" })}
          />
        </Fieldset>

        <Button type="submit" mt="md">
          Save
        </Button>
      </form>
    </Modal>
  );
}

export default LabelEditForm;
