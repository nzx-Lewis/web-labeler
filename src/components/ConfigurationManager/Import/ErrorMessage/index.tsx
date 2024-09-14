import { ErrorMessageProps } from "./types.ts";
import { Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";

function ErrorMessage({ title, message }: ErrorMessageProps) {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsHidden(true), 5000);
    return () => clearTimeout(timeoutId);
  }, [title, message]);

  return (
    !isHidden && (
      <Stack align="center" gap={0} mt={10}>
        <Text c="orange.6" size="sm">
          {title}
        </Text>
        <Text c="orange.7" size="xs">
          {message}
        </Text>
      </Stack>
    )
  );
}

export default ErrorMessage;
