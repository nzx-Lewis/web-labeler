import { Label } from "../../../options/types.ts";
import classes from "./style.module.scss";
import clsx from "clsx";
import { Card } from "@mantine/core";
import { nlToBr } from "../../../utils/common.ts";

interface LabelPreviewProps {
  label: Omit<Label, "id" | "isActive">;
}

function LabelPreview({ label }: LabelPreviewProps) {
  return (
    <Card padding="lg" radius="sm" withBorder className={classes.labelPreview}>
      <span>Window</span>
      <div
        className={clsx(
          classes.label,
          classes[label.shape],
          classes[label.position],
        )}
        style={
          {
            position: "absolute",
            pointerEvents: "unset",
            "--label-text-color": label.textColor,
            "--label-background-color": label.bgColor,
            "--label-opacity": label.opacity,
            "--label-hovered-opacity": label.hoveredOpacity,
            "--label-scale": label.scale,
            "--label-font-size": label.fontSize + "px",
          } as React.CSSProperties
        }
        dangerouslySetInnerHTML={{
          __html: label.shape !== "frame" ? nlToBr(label.name) : "",
        }}
      ></div>
    </Card>
  );
}

export default LabelPreview;
