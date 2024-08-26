import {
  Button,
  Fieldset,
  Flex,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { ruleTypes } from "../../../../options/constants.ts";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useLabelEditFormContext } from "../formContext.ts";

function LabelEditFormRules() {
  const form = useLabelEditFormContext();

  return (
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
  );
}

export default LabelEditFormRules;
