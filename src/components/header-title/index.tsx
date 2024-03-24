import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

interface IHeaderTitle {
    icon: JSX.Element | ReactNode;
    title: string;
    level?:
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "body1"
        | "body2"
        | "subtitle1"
        | "subtitle2"
        | "caption";
    titleStyles?: Record<string, string>;
}

export default function HeaderTitle({ icon, title, level = "h2", titleStyles }: IHeaderTitle) {
    return (
        <Box className="flex flex-row">
            {icon}
            <Typography sx={{ ...titleStyles }} variant={level}>
                {title}
            </Typography>
        </Box>
    );
}
