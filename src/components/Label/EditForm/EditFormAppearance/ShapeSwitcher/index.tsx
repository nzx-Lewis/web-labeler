import {SegmentedControl} from "@mantine/core";
import {Shape, shapes} from "../../../../../options/constants.ts";
import {useLabelEditFormContext} from "../../formContext.ts";
import {shapeSettings} from "./settings.tsx";
import classes from './style.module.scss'

const Index = () => {
    const form = useLabelEditFormContext();

    return (
        <SegmentedControl
            data={shapes.map(shape => {
                const shapeTyped = shape as Shape;
                return {
                    value: shape,
                    label: (
                        <div className={classes.shapeControlOption}>
                            {shapeSettings?.[shapeTyped].icon}
                            <span>{shape}</span>
                        </div>
                    )
                }
            })}
            key={form.key("shape")}
            {...form.getInputProps("shape")}
        />
    );
};

export default Index;