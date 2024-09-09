import { Button } from "@mantine/core";

function ConfigurationImportFromUrl() {
  const importFromUrl = () => {
    chrome.runtime.sendMessage(
      {
        type: "importFromUrl",
        url: "https://drive.google.com/file/d/1cYYhxYPB-BfjzmiLxPFfcK0Gg0aDW25R/view?usp=drive_link",
      },
      (response) => {
        console.log(response);
      },
    );
  };
  return <Button onClick={importFromUrl}>Test</Button>;
}

export default ConfigurationImportFromUrl;
