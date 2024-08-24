import {
  Container,
  Switch,
  Paper,
  Stack,
  Title,
  Group,
  Image,
} from "@mantine/core";
import { OptionsPageProps } from "./types.ts";
import LabelList from "../Label";
import ConfigurationManager from "../ConfigurationManager";

function OptionsPage({ options, dispatch }: OptionsPageProps) {
  return (
    <Container p={20}>
      <Stack>
        <Group wrap="nowrap" justify="space-between" align="center">
          <Group wrap="nowrap" align="center" gap="xs">
            <Image src="/icon/icon-32.png" />
            <Title order={1} size="h2">
              WebLabeler
            </Title>
          </Group>
          <Switch
            size="lg"
            onLabel="On"
            offLabel="Off"
            checked={options.isActive}
            onChange={() => {
              dispatch({ type: "toggleActive" });
            }}
          />
        </Group>

        <Paper shadow="xs" p="xl">
          <LabelList
            labels={options.labels}
            dispatch={dispatch}
            isStatusSwitchDisabled={!options.isActive}
          />
        </Paper>

        <ConfigurationManager labels={options.labels} dispatch={dispatch} />
      </Stack>
    </Container>
  );
}

export default OptionsPage;
