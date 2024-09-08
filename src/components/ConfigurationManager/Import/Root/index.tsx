import { Button } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { ConfigurationImportProps } from "./types.ts";
import { modals } from "@mantine/modals";
import ConfigurationImportTabs from "../Tabs";

function ConfigurationImport({ dispatch }: ConfigurationImportProps) {
  return (
    <>
      <Button
        variant="default"
        size="xs"
        leftSection={<IconUpload size={16} />}
        onClick={() => {
          modals.open({
            title: "Import Labels",
            children: <ConfigurationImportTabs dispatch={dispatch} />,
          });
        }}
      >
        Import Labels
      </Button>
    </>
  );
}

export default ConfigurationImport;
