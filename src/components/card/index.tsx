import React from 'react'

import Box from '@mui/material/Box';
import { SxProps, useTheme } from '@mui/material';

interface Props {
    children: React.ReactNode;
    sx?: SxProps;
}

export default function Card({ children, sx = {} }: Props) {

    const theme = useTheme();

    return (
        <Box sx={{ border: "1px solid", borderColor: theme.palette.grey[400], borderRadius: "0.4rem", ...sx }}>
            {children}
        </Box>
    )
}
