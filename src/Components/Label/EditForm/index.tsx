import {
  Button,
  ColorInput,
  Fieldset,
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

function LabelEditForm() {
  const form = useForm({
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
      name: (value) => {
        return !value.trim().length ? "Type label name" : null;
      },
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(
        (values, event) => {
          console.log(
            "onSubmit",
            values, // <- form.getValues() at the moment of submit
            event, // <- form element submit event
          );
        },
        // (validationErrors, values, event) => {
        //   console.log(
        //     validationErrors, // <- form.errors at the moment of submit
        //     values, // <- form.getValues() at the moment of submit
        //     event, // <- form element submit event
        //   );
        // },
      )}
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
  );
}

export default LabelEditForm;
