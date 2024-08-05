import {
  Button,
  ColorInput,
  Container,
  Fieldset,
  SegmentedControl,
  Switch,
  TextInput,
  Text,
} from "@mantine/core";
import { OptionsProps } from "./types.ts";
import { Positions, RuleTypes, Shapes } from "../../types.ts";

function Options({ labels, isLoading, isActive, dispatch }: OptionsProps) {
  const ruleTypes: RuleTypes = [
    "contains",
    "startsWith",
    "endsWith",
    "matches",
  ];

  const shapes: Shapes = ["stripe", "triangle"];

  const positions: Positions = [
    "left-top",
    "right-top",
    "left-bottom",
    "right-bottom",
  ];

  return (
    <Container p={20}>
      {isLoading ? (
        "is loading..."
      ) : (
        <div>
          <Switch
            size="lg"
            onLabel="ON"
            offLabel="OFF"
            checked={isActive}
            onChange={() => {
              dispatch({ type: "toggleActive" });
            }}
          />
          <span>Labels:</span>
          <ul>
            {labels.map((label) => (
              <li>{label.name}</li>
            ))}
          </ul>

          <form>
            <Fieldset legend="Appearance & Position">
              <TextInput label="Name" placeholder="Name" />
              <ColorInput
                label="Background color"
                placeholder="Background color"
              />
              <ColorInput label="Text color" placeholder="Text color" />
              <Text size="sm" fw={500} mt={3}>
                Shape
              </Text>
              <SegmentedControl data={shapes} />
              <Text size="sm" fw={500} mt={3}>
                Position
              </Text>
              <SegmentedControl data={positions} />
            </Fieldset>

            <Fieldset legend="Rules">
              <Text size="sm" fw={500} mt={3}>
                Rule type
              </Text>
              <SegmentedControl data={ruleTypes} />
              <TextInput label="Rule value" placeholder="Rule value" />
            </Fieldset>

            <Button type="submit" mt="md">
              Submit
            </Button>
          </form>
        </div>
      )}
    </Container>
  );
}

export default Options;
