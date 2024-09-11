import { Text, Stack, Group } from "@mantine/core";
import { IconUpload, IconX, IconFileCode } from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import validate from "../../../../utils/schemaValidator";
import { validationSchema } from "../../../../options/validationSchema.ts";
import { ConfigurationImportFromFilesProps } from "./types.ts";

function ConfigurationImportFromFile({
  dispatch,
}: ConfigurationImportFromFilesProps) {
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
    <Dropzone
      onDrop={(file) => {
        setFile(file[0]);
      }}
      accept={["application/json"]}
      multiple={false}
    >
      <Group
        gap="md"
        justify="center"
        wrap="nowrap"
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload size={44} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={44} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFileCode size={44} />
        </Dropzone.Idle>
        <Stack gap={0}>
          <Text size="l">Drag file here or click to select</Text>
          <Text size="xs" c="dimmed">
            Use exported configuration file in JSON format
          </Text>
        </Stack>
      </Group>
    </Dropzone>
  );
}

export default ConfigurationImportFromFile;
