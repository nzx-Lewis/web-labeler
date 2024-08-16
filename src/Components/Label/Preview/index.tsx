import { Label } from "../../../options/types.ts";
import classes from "./style.module.scss";
import labelClasses from "../../../contentScript/style.module.scss";
import clsx from "clsx";
import { Card } from "@mantine/core";

interface LabelPreviewProps {
  label: Omit<Label, "id" | "isActive">;
}

function LabelPreview({ label }: LabelPreviewProps) {
  return (
    <Card padding="lg" radius="sm" withBorder className={classes.labelPreview}>
      <div
        className={clsx(
          labelClasses.label,
          labelClasses[label.shape],
          labelClasses[label.position],
        )}
        style={
          {
            position: "absolute",
            "--label-text-color": label.textColor,
            "--label-background-color": label.bgColor,
            "--label-opacity": label.opacity,
          } as React.CSSProperties
        }
      >
        {label.name}
      </div>
    </Card>
  );
}

export default LabelPreview;
