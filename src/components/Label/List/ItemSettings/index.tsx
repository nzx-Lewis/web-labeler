import { Button, Group, Text } from "@mantine/core";
import {
  IconFlask,
  IconForms,
  IconLabel,
  IconPhotoCircle,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import LabelEditForm from "../../EditForm";
import { LabelListItemSettingsProps } from "./types.ts";
import { LabelEditFormSection } from "../../EditForm/types.ts";
import FeatureBadge from "../../../FeatureBadge";

function LabelListItemSettings({ label }: LabelListItemSettingsProps) {
  return (
    <Group gap="xs">
      <Button
        size="xs"
        variant="light"
        leftSection={<IconLabel size={14} />}
        onClick={() => {
          modals.open({
            title: "Badge",
            size: "auto",
            children: (
              <LabelEditForm
                label={label}
                section={LabelEditFormSection.Badge}
                onSave={() => modals.closeAll()}
              />
            ),
          });
        }}
      >
        Badge
      </Button>
      <Button
        size="xs"
        variant="light"
        leftSection={<IconPhotoCircle size={14} />}
        onClick={() => {
          modals.open({
            title: (
              <Group gap="md">
                Icon
                <FeatureBadge
                  title="Experimental"
                  text={
                    <>
                      <Text size="sm">
                        This feature is experimental and may not work as
                        expected. If you encounter any issues or have
                        suggestions, please let the developer know.
                      </Text>
                      <Text size="sm">
                        And if you actually enjoy using it — please tell him
                        too, it might just make his day 😊🙏!
                      </Text>
                    </>
                  }
                  color="orange"
                  icon={<IconFlask size={14} />}
                />
              </Group>
            ),
            size: "auto",
            children: (
              <LabelEditForm
                label={label}
                section={LabelEditFormSection.Icon}
                onSave={() => modals.closeAll()}
              />
            ),
          });
        }}
      >
        Icon
      </Button>
      <Button
        size="xs"
        variant="light"
        leftSection={<IconForms size={14} />}
        onClick={() => {
          modals.open({
            title: "Rules",
            size: "lg",
            children: (
              <LabelEditForm
                label={label}
                section={LabelEditFormSection.Rules}
                onSave={() => modals.closeAll()}
              />
            ),
          });
        }}
      >
        Rules
      </Button>
    </Group>
  );
}

export default LabelListItemSettings;
