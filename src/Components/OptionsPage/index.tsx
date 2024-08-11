import { Container, Switch, Paper, Stack } from "@mantine/core";
import { OptionsPageProps } from "./types.ts";
import LabelList from "../Label/List";

function OptionsPage({ options, dispatch }: OptionsPageProps) {
  return (
    <Container p={20}>
      <Stack>
        <Switch
          size="lg"
          onLabel="ON"
          offLabel="OFF"
          checked={options.isActive}
          label="Turn on/off all labels"
          onChange={() => {
            dispatch({ type: "toggleActive" });
          }}
        />
        <Paper shadow="xs" p="xl">
          <LabelList labels={options.labels} dispatch={dispatch}></LabelList>
        </Paper>
      </Stack>
    </Container>
  );
}

export default OptionsPage;
