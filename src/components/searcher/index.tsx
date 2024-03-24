import React from "react";
import debounce from "lodash/debounce";

// ** MUI Imports
import { TextField } from "@mui/material";

interface Props {
    defaultValue?: string,
    onChange(q: string): Promise<void> | void;
    placeholder?: string;
}

const Searcher = React.forwardRef(
    (
        {
            defaultValue,
            onChange: externalOnChange,
            placeholder
        }: Props,
        ref
    ) => {

        const debouncedSearch = debounce((e: any) => {
            externalOnChange(e.target.value);
        }, 600);

        return (
            <TextField
                fullWidth
                inputRef={ref}
                defaultValue={defaultValue || ""}
                placeholder={placeholder}
                onChange={debouncedSearch}
            />
        );
    }
);

export default Searcher;