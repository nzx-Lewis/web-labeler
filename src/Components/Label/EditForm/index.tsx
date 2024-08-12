import {
  Button,
  ColorInput,
  Fieldset,
  Modal,
  SegmentedControl,
  TextInput,
  Slider,
  Stack,
  Input,
  Switch,
  Select,
  Flex,
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
import { IconDeviceFloppy, IconPlus, IconTrash } from "@tabler/icons-react";

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
      rules: [{ type: ruleTypes[0], value: "" }],
      isActive: true,
    },
    validate: {
      // ruleValues: (value) => {
      //   return !value.trim().length ? "The rule value can't be empty" : null;
      // },
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
      size="lg"
      opened={isOpen}
      title={label ? "Edit Label" : "New Label"}
      onClose={onClose}
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
                color="gray"
                label={(value) => `${Math.round(value * 100)}%`}
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

            <Input.Wrapper label={<Input.Label pr="md">Position</Input.Label>}>
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
                console.log("here");
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

        <Fieldset legend="Status" mt="md">
          <Switch
            label="Active/Disabled"
            key={form.key("isActive")}
            {...form.getInputProps("isActive", { type: "checkbox" })}
          />
        </Fieldset>

        <Button
          type="submit"
          mt="md"
          leftSection={<IconDeviceFloppy size={14} />}
        >
          Save
        </Button>
      </form>
    </Modal>
  );
}

export default LabelEditForm;
