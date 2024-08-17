import { Button } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";

function ConfigurationImport() {
  return (
    <Button
      disabled
      variant="white"
      size="xs"
      leftSection={<IconUpload size={16} />}
    >
      Import Labels
    </Button>
  );
}

export default ConfigurationImport;
