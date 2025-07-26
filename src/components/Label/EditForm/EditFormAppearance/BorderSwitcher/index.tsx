import {SegmentedControl} from "@mantine/core";
import {borders, Border} from "../../../../../options/constants.ts";
import {useLabelEditFormContext} from "../../formContext.ts";
import {borderSettings} from "./settings.tsx";
import classes from './style.module.scss'

const Index = () => {
    const form = useLabelEditFormContext();

    return (
        <SegmentedControl
            data={borders.map(border => {
                const borderTyped = border as Border;
                return {
                    value: border,
                    label: (
                        <div className={classes.borderControlOption}>
                            {borderSettings?.[borderTyped].icon}
                            <span>{border}</span>
                        </div>
                    )
                }
            })}
            key={form.key("border")}
            {...form.getInputProps("border")}
        />
    );
};

export default Index;