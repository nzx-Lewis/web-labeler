import { Button, FileButton } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import validate from "../../../utils/schemaValidator";
import { validationSchema } from "../../../options/validationSchema.ts";
import { ConfigurationImportProps } from "./types.ts";

function ConfigurationImport({ dispatch }: ConfigurationImportProps) {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file === null) return;

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        if (typeof e?.target?.result !== "string")
          throw new Error("The file is not readable");

        const labels = JSON.parse(e.target.result);

        if (!Array.isArray(labels))
          throw new Error("The file doesn't contain an array of labels ");

        for (const label of labels) {
          const { result: isValid, messages } = validate(
            label,
            validationSchema,
          );
          if (!isValid) {
            throw new Error(messages?.join("; "));
            break;
          }
        }

        //TODO: use another approach to work with chrome storage
        // (replace usePersistedStorage with normal approach communicating with storage like restAPI)
        dispatch({ type: "initialize", payload: { isActive: true, labels } });
      } catch (err) {
        const message = err instanceof Error ? err.message : "";
        console.log("The imported file has syntax errors", message);
        //TODO: show error message
      }
    };
  }, [file]);

  return (
    <>
      <FileButton onChange={setFile} accept=".json">
        {(props) => (
          <Button
            variant="default"
            size="xs"
            leftSection={<IconUpload size={16} />}
            {...props}
          >
            Import Labels
          </Button>
        )}
      </FileButton>
    </>
  );
}

export default ConfigurationImport;
