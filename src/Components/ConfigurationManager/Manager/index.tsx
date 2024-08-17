import { Group } from "@mantine/core";
import ConfigurationImport from "../Import";
import ConfigurationExport from "../Export";
import { ConfigurationManagerProps } from "./types.ts";

function ConfigurationManager({ labels }: ConfigurationManagerProps) {
  return (
    <Group>
      <ConfigurationExport labels={labels} />
      <ConfigurationImport />
    </Group>
  );
}

export default ConfigurationManager;
