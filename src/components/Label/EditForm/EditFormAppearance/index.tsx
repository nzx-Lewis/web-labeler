import {
    ColorInput,
    Group,
    Input,
    Slider,
    Stack,
    Fieldset,
    Textarea,
    Flex,
    Text
} from "@mantine/core";
import {colorSwatches} from "../../../../options/constants.ts";
import LabelPreview from "../../Preview";
import {useLabelEditFormContext} from "../formContext.ts";
import PositionControls from "./PositionControls";
import ShapeSwitcher from "./ShapeSwitcher";

function LabelEditFormAppearance() {
    const form = useLabelEditFormContext();

    return (
        <Flex gap="sm" wrap="wrap">
            <Fieldset legend="Settings" style={{flexGrow: 1}}>
                <Stack gap="sm">
                    <Textarea
                        label="Name"
                        placeholder="Name"
                        key={form.key("name")}
                        {...form.getInputProps("name")}
                        minRows={1}
                        maxRows={3}
                    />

                    <Stack style={{flexGrow: 1, gap: 0}}>
                        <Text size="sm" fw={500}>Shape</Text>
                        <ShapeSwitcher/>
                    </Stack>

                    <Group gap="xs" grow wrap="nowrap">
                        <ColorInput
                            label="Background color"
                            placeholder="Background color"
                            swatchesPerRow={colorSwatches.length}
                            swatches={[...colorSwatches]}
                            key={form.key("bgColor")}
                            {...form.getInputProps("bgColor")}
                        />
                        <ColorInput
                            label="Text color"
                            placeholder="Text color"
                            swatchesPerRow={colorSwatches.length}
                            swatches={[...colorSwatches]}
                            key={form.key("textColor")}
                            {...form.getInputProps("textColor")}
                        />
                    </Group>

                    <Group gap="xs" grow>
                        <Input.Wrapper label="Opacity">
                            <Slider
                                color="gray"
                                label={(value) => `${Math.round(value * 100)}%`}
                                min={0.1}
                                max={1}
                                step={0.05}
                                key={form.key("opacity")}
                                {...form.getInputProps("opacity")}
                            />
                        </Input.Wrapper>
                        <Input.Wrapper label="Hovered Opacity">
                            <Slider
                                color="gray"
                                label={(value) => `${Math.round(value * 100)}%`}
                                min={0}
                                max={1}
                                step={0.05}
                                key={form.key("hoveredOpacity")}
                                {...form.getInputProps("hoveredOpacity")}
                            />
                        </Input.Wrapper>
                    </Group>

                    <Group gap="xs" grow>
                        <Input.Wrapper label="Scale">
                            <Slider
                                color="gray"
                                min={0.5}
                                max={2}
                                step={0.05}
                                key={form.key("scale")}
                                {...form.getInputProps("scale")}
                            />
                        </Input.Wrapper>
                        <Input.Wrapper label="Font Size">
                            <Slider
                                color="gray"
                                label={(value) => `${value.toFixed(1)}px`}
                                min={10}
                                max={30}
                                step={0.1}
                                key={form.key("fontSize")}
                                {...form.getInputProps("fontSize")}
                            />
                        </Input.Wrapper>
                    </Group>
                </Stack>
            </Fieldset>
            <Fieldset legend="Preview" style={{flexGrow: 1}}>
                <LabelPreview label={{...form.getValues()}}>
                    <PositionControls/>
                </LabelPreview>
            </Fieldset>
        </Flex>
    );
}

export default LabelEditFormAppearance;
