import { Group } from "@mantine/core";
import ConfigurationImport from "../Import/Root";
import ConfigurationExport from "../Export";
import { ConfigurationManagerProps } from "./types.ts";

function ConfigurationManager({ labels, dispatch }: ConfigurationManagerProps) {
  return (
    <Group>
      <ConfigurationExport labels={labels} />
      <ConfigurationImport dispatch={dispatch} />
    </Group>
  );
}

export default ConfigurationManager;
