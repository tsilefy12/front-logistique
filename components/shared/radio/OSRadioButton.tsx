import { useField, useFormikContext } from "formik";
import {
    RadioGroup,
    FormControl,
    FormLabel,
    FormHelperText,
} from "@mui/material";

const OSRadioButton = ({ children, ...props }: any) => {
    const [field, meta] = useField(props.name);

    const { setFieldValue } = useFormikContext();

    const config = {
        ...field,
        ...props,
        onChange: (event: any) => {
            setFieldValue(props.name, event.target.value);
        },
    };

    const configFormControl = {} as any;
    if (meta && meta.touched && meta.error) {
        configFormControl.error = true;
    }

    return (
        <>
            <FormControl {...configFormControl}>
                <FormLabel component="legend">{props.legend}</FormLabel>
                <RadioGroup {...config}>{children}</RadioGroup>
            </FormControl>
            <FormHelperText sx={{ color: "red" }}>{meta.error}</FormHelperText>
        </>
    );
};

export default OSRadioButton;
