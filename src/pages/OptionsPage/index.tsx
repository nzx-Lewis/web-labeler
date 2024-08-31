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
import LabelList from "../../components/Label";
import ConfigurationManager from "../../components/ConfigurationManager";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import classes from "./style.module.scss";

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
          <Group wrap="nowrap" align="center" gap="xs">
            <Switch
              size="lg"
              onLabel="On"
              offLabel="Off"
              checked={options.isActive}
              onChange={() => {
                dispatch({ type: "toggleActive" });
              }}
            />
            <ThemeSwitcher />
          </Group>
        </Group>

        <Paper shadow="xs" p="xl" className={classes.labelListContainer}>
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
