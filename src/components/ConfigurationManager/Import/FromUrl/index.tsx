import { Button } from "@mantine/core";

function ConfigurationImportFromUrl() {
  const importFromUrl = () => {
    chrome.runtime.sendMessage(
      { type: "importFromUrl", url: "testUrlTestUrl" },
      (response) => {
        console.log(response);
      },
    );
  };
  return <Button onClick={importFromUrl}>Test</Button>;
}

export default ConfigurationImportFromUrl;
