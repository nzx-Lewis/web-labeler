import { Container, Switch, Space } from "@mantine/core";
import { OptionsPageProps } from "./types.ts";
import LabelList from "../Label/List";
import LabelEditForm from "../Label/EditForm";

function OptionsPage({ options, dispatch }: OptionsPageProps) {
  return (
    <Container p={20}>
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

      <Space h="md"></Space>

      <LabelList labels={options.labels}></LabelList>

      <Space h="md"></Space>

      <LabelEditForm dispatch={dispatch}></LabelEditForm>
    </Container>
  );
}

export default OptionsPage;
