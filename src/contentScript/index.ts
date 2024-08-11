import { Label, Options } from "./../options/types";
import { ruleTypes } from "../options/constants.ts";
import classes from "./style.module.scss";

const initialize = async () => {
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

  const label = matchLabel(window.location.hostname, options.labels);
  if (label !== false) {
    renderLabel();
  }
};

const matchLabel = (hostname: string, labels: Label[]): Label | false => {
  for (const label of labels) {
    if (checkRule(label.ruleType, label.ruleValue, hostname)) {
      return label;
    }
  }
  return false;
};

const checkRule = (
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

const renderLabel = (): void => {
  const labelElement = document.createElement("div");
  labelElement.className = classes.label;
  document.body.appendChild(labelElement);
  console.log("here", classes.label);
};

initialize();
