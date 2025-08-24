import { Button } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { CollapseButtonProps } from "./types.tsx";
import classes from "./style.module.scss";

const CollapseButton = ({ expanded, toggle }: CollapseButtonProps) => {
  return (
    <div className={classes.CollapseButton}>
      <Button
        variant="default"
        size="xs"
        radius="xl"
        onClick={toggle}
        leftSection={
          expanded ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
        }
      >
        {expanded ? "Less" : "More"}
      </Button>
    </div>
  );
};

export default CollapseButton;
