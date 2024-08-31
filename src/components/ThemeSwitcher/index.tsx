import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

function ThemeSwitcher() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="default"
      size="lg"
      radius="xl"
      aria-label="Toggle color scheme"
    >
      {computedColorScheme === "dark" ? (
        <IconSun size={14} />
      ) : (
        <IconMoon size={14} />
      )}
    </ActionIcon>
  );
}

export default ThemeSwitcher;
