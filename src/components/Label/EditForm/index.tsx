import { Button } from "@mantine/core";
import { LabelEditFormProps, LabelEditFormValues } from "./types.ts";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useLabelEditForm, LabelEditFormProvider } from "./formContext.ts";
import LabelEditFormAppearance from "./EditFormAppearance";
import LabelEditFormRules from "./EditFormRules";
import { useCallback, useEffect } from "react";
import { editLabelFormInput } from "./formConfig.ts";

function LabelEditForm({ label, dispatch, onSave }: LabelEditFormProps) {
  const form = useLabelEditForm(editLabelFormInput);

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
        <LabelEditFormAppearance />
        <LabelEditFormRules />
        <Button
          type="submit"
          mt="md"
          leftSection={<IconDeviceFloppy size={14} />}
        >
          Save
        </Button>
      </form>
    </LabelEditFormProvider>
  );
}

export default LabelEditForm;
