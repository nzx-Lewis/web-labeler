import { Label, Options } from "./../options/types";
import { ruleTypes } from "../options/constants.ts";
import classes from "./style.module.scss";

class EnvLabel {
  private labelElement: HTMLDivElement | null;
  constructor() {
    this.labelElement = null;
    this.initialize();

    chrome.storage.sync.onChanged.addListener(this.initialize);
  }
  private initialize = async () => {
    this.removeLabelFromDom();

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
    }
  };

  private matchLabel = (hostname: string, labels: Label[]): Label | false => {
    for (const label of labels) {
      if (this.checkRule(label.ruleType, label.ruleValue, hostname)) {
        return label;
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
    this.labelElement.innerHTML = label.name;
    this.labelElement.style.setProperty("--label-text-color", label.textColor);
    this.labelElement.style.setProperty(
      "--label-background-color",
      label.bgColor,
    );
    document.body.appendChild(this.labelElement);
  };

  private removeLabelFromDom() {
    if (this.labelElement) {
      document.body.removeChild(this.labelElement);
      this.labelElement = null;
    }
  }
}

new EnvLabel();
