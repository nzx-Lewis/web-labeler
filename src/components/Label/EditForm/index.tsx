import { Button } from "@mantine/core";
import {
  LabelEditFormProps,
  LabelEditFormSection,
  LabelEditFormValues,
} from "./types.ts";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useLabelEditForm, LabelEditFormProvider } from "./formContext.ts";
import LabelEditFormAppearance from "./EditFormAppearance";
import LabelEditFormRules from "./EditFormRules";
import { useCallback, useEffect } from "react";
import { editLabelFormInput } from "./formConfig.ts";
import { useOptionsContext } from "../../../hooks/useOptionsContext";

function LabelEditForm({ label, onSave, section }: LabelEditFormProps) {
  const isNew = !label?.rules.length;
  const form = useLabelEditForm(editLabelFormInput(isNew));
  const { dispatch } = useOptionsContext();

  useEffect(() => {
    form.initialize({ ...form.values, ...label });
  }, [label]);

  const onFormSubmitHandler = useCallback(
    (values: LabelEditFormValues) => {
      dispatch(
        !label
          ? {
              type: "addLabel",
              payload: { label: { ...values, isActive: true } },
            }
          : {
              type: "updateLabel",
              payload: {
                label: { id: label.id, ...values, isActive: label.isActive },
              },
            },
      );
      if (onSave) {
        onSave();
      }
    },
    [dispatch, label, onSave],
  );

  return (
    <LabelEditFormProvider form={form}>
      <form onSubmit={form.onSubmit(onFormSubmitHandler)}>
        {section == LabelEditFormSection.Appearance && (
          <LabelEditFormAppearance />
        )}
        {section === LabelEditFormSection.Rules && <LabelEditFormRules />}
        <Button
          mt="md"
          type="submit"
          leftSection={<IconDeviceFloppy size={14} />}
        >
          Save
        </Button>
      </form>
    </LabelEditFormProvider>
  );
}

export default LabelEditForm;
