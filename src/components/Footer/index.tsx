import { Button, Divider, Group, Stack, Text } from "@mantine/core";
import { IconHeartFilled } from "@tabler/icons-react";
import { URLS } from "../../utils/constants.ts";
import classes from "./styles.module.scss";

const Index = () => {
  return (
    <Stack gap="sm" mt="xl">
      <Divider mb={4} />

      <Group gap="xs">
        <Text size="xs">Find this extension helpful?</Text>
        <Button
          component="a"
          size="xs"
          variant="subtle"
          href={URLS.WRITE_REVIEW}
          target="_blank"
          rel="noopener noreferrer"
          leftSection={<IconHeartFilled size={16} />}
          className={classes.rateButton}
        >
          Rate It On The Chrome Web Store
        </Button>
      </Group>
    </Stack>
  );
};

export default Index;
