import { Label, Options } from "./../options/types";
import { ruleTypes } from "../options/constants.ts";
import classes from "./style.module.scss";

class EnvLabel {
  private labelElement: HTMLDivElement | null;
  private hoverListener: ((event: MouseEvent) => void) | null;
  constructor() {
    this.labelElement = null;
    this.hoverListener = null;
    this.initialize();

    chrome.storage.sync.onChanged.addListener(this.initialize);
  }
  private initialize = async () => {
    this.removeLabelFromDom();
    if (this.hoverListener) {
      document.removeEventListener("mousemove", this.hoverListener);
    }

    const { options } = (await chrome.storage.sync.get("options")) as {
      options: Options;
    };

    if (
      options?.isActive !== true ||
      !Array.isArray(options?.labels) ||
      options?.labels?.length === 0
    ) {
      return;
    }

    const label = this.matchLabel(window.location.hostname, options.labels);
    if (label !== false) {
      this.renderLabel(label);
      if (label.hoveredOpacity !== undefined) {
        this.hoverListener = this.hoverHandler;
        document.addEventListener("mousemove", this.hoverListener);
      }
    }
  };

  private matchLabel = (hostname: string, labels: Label[]): Label | false => {
    for (const label of labels) {
      if (!label.isActive) {
        continue;
      }
      for (const rule of label.rules) {
        if (this.checkRule(rule.type, rule.value, hostname)) {
          return label;
        }
      }
    }
    return false;
  };

  private checkRule = (
    ruleType: (typeof ruleTypes)[number],
    ruleValue: string,
    str: string,
  ): boolean => {
    switch (ruleType) {
      case "matches":
        return str == ruleValue;
      case "startsWith":
        return str.startsWith(ruleValue);
      case "endsWith":
        return str.endsWith(ruleValue);
      case "contains":
        return str.includes(ruleValue);
      default:
        return false;
    }
  };
  private renderLabel = (label: Label): void => {
    this.labelElement = document.createElement("div");
    this.labelElement.className = classes.label;
    this.labelElement.classList.add(classes?.[label.shape]);
    this.labelElement.classList.add(classes?.[label.position]);
    this.labelElement.innerHTML =
      label.shape === "frame" ? "" : label.name.replace(/\r\n|\r|\n/g, "<br>");

    this.labelElement.style.setProperty("--label-text-color", label.textColor);
    this.labelElement.style.setProperty(
      "--label-opacity",
      String(label.opacity),
    );
    this.labelElement.style.setProperty(
      "--label-background-color",
      label.bgColor,
    );
    if (label.hoveredOpacity !== undefined) {
      this.labelElement.style.setProperty(
        "--label-hovered-opacity",
        String(label.hoveredOpacity),
      );
    }
    if (label.fontSize) {
      this.labelElement.style.setProperty(
        "--label-font-size",
        String(label.fontSize) + "px",
      );
    }
    if (label.scale) {
      this.labelElement.style.setProperty("--label-scale", String(label.scale));
    }

    document.body.appendChild(this.labelElement);
  };

  private removeLabelFromDom() {
    if (this.labelElement) {
      document.body.removeChild(this.labelElement);
      this.labelElement = null;
    }
  }

  private hoverHandler = (event: MouseEvent) => {
    if (!this.labelElement) {
      return;
    }
    const { left, top, width, height } =
      this.labelElement.getBoundingClientRect();

    const isHovering =
      event.clientX >= left &&
      event.clientX <= left + width &&
      event.clientY >= top &&
      event.clientY <= top + height;

    if (isHovering) {
      this.labelElement.classList.add(classes.hovered);
    } else {
      this.labelElement.classList.remove(classes.hovered);
    }
  };
}

new EnvLabel();
