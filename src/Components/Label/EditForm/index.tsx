import {
  Button,
  ColorInput,
  Fieldset,
  Modal,
  SegmentedControl,
  Text,
  TextInput,
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
      shape: shapes[0],
      position: positions[0],
      ruleType: ruleTypes[0],
      ruleValue: "*",
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
          <Text size="sm" fw={500} mt={3}>
            Shape
          </Text>
          <SegmentedControl
            data={[...shapes]}
            key={form.key("shape")}
            {...form.getInputProps("shape")}
          />
          <Text size="sm" fw={500} mt={3}>
            Position
          </Text>
          <SegmentedControl
            data={[...positions]}
            key={form.key("position")}
            {...form.getInputProps("position")}
          />
        </Fieldset>

        <Fieldset legend="Rules">
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
        </Fieldset>

        <Button type="submit" mt="md">
          Save
        </Button>
      </form>
    </Modal>
  );
}

export default LabelEditForm;
