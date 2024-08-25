import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { ConfigurationExportProps } from "./types.ts";

function ConfigurationExport({ labels }: ConfigurationExportProps) {
  const exportLabels = () => {
    const file = new File(
      [JSON.stringify(labels)],
      `Labels-${new Date().toISOString().split("T")[0]}.json`,
      {
        type: "text/json",
      },
    );

    const link = document.createElement("a");
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button
      disabled={!labels.length}
      onClick={exportLabels}
      variant="white"
      size="xs"
      leftSection={<IconDownload size={16} />}
    >
      Export Labels
    </Button>
  );
}

export default ConfigurationExport;
