import {
  Button,
  ColorInput,
  Fieldset,
  SegmentedControl,
  TextInput,
  Slider,
  Stack,
  Input,
  Select,
  Flex,
  Group,
} from "@mantine/core";
import {
  colorSwatches,
  positions,
  ruleTypes,
  shapes,
} from "../../../options/constants.ts";
import { useForm } from "@mantine/form";
import { LabelEditFormProps } from "./types.ts";
import { Label } from "../../../options/types.ts";
import { IconDeviceFloppy, IconPlus, IconTrash } from "@tabler/icons-react";
import LabelPreview from "../Preview";

function LabelEditForm({ label, dispatch, onSave }: LabelEditFormProps) {
  const form = useForm<Omit<Label, "id" | "isActive">>({
    initialValues: {
      name: "",
      bgColor: colorSwatches[0],
      textColor: colorSwatches[colorSwatches.length - 1],
      opacity: 0.75,
      shape: shapes[0],
      position: positions[0],
      rules: [{ type: ruleTypes[0], value: "" }],
    },
    enhanceGetInputProps: (payload) => ({
      disabled:
        (payload.field === "textColor" || payload.field === "position") &&
        payload.form.values.shape === "frame",
    }),
    validate: {
      rules: {
        value: (value) =>
          !value.trim().length ? "The rule value can't be empty" : null,
      },
    },
  });

  if (label) {
    form.initialize({ ...form.values, ...label });
  }

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        if (!label) {
          dispatch({
            type: "addLabel",
            payload: { label: { ...values, isActive: true } },
          });
        } else {
          dispatch({
            type: "updateLabel",
            payload: {
              label: { id: label.id, ...values, isActive: label.isActive },
            },
          });
        }
        if (onSave) {
          onSave();
        }
      })}
    >
      <Fieldset legend="Appearance & Position">
        <Group align="stretch" wrap="nowrap">
          <Stack gap="xs">
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

      <Fieldset legend="Rules" mt="md">
        <Stack gap="xs">
          {form.getValues().rules.map((_item, index) => (
            <Flex key={`rule_${index}`} direction="row" gap="xs">
              <Select
                data={[...ruleTypes]}
                key={form.key(`rules.${index}.type`)}
                {...form.getInputProps(`rules.${index}.type`)}
                style={{ maxWidth: "120px" }}
                allowDeselect={false}
              />
              <TextInput
                placeholder="Rule value"
                key={form.key(`rules.${index}.value`)}
                {...form.getInputProps(`rules.${index}.value`)}
                style={{ flexGrow: 1 }}
              />
              <Button
                color="gray"
                variant="light"
                p="xs"
                onClick={() => {
                  form.removeListItem("rules", index);
                }}
              >
                <IconTrash size={14}></IconTrash>
              </Button>
            </Flex>
          ))}

          <Button
            size="xs"
            color="gray"
            variant="light"
            leftSection={<IconPlus size={14} />}
            onClick={() => {
              form.insertListItem("rules", {
                type: ruleTypes[0],
                value: "",
              });
            }}
          >
            Add Rule
          </Button>
        </Stack>
      </Fieldset>

      <Button
        type="submit"
        mt="md"
        leftSection={<IconDeviceFloppy size={14} />}
      >
        Save
      </Button>
    </form>
  );
}

export default LabelEditForm;
