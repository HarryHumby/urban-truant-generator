'use client';

import React from 'react'

import { Box, SxProps, useTheme } from '@mui/material';

interface Props {
    children: React.ReactNode;
    sx?: SxProps;
}


export default function SimplifiCard({ sx, children }: Props) {

    const theme = useTheme();

    const DEFAULT_SX: SxProps = {
        border: "1px solid",
        borderColor: theme.palette.grey[400],
        borderRadius: "0.4rem",
        p: 5
    }

    return (
        <Box sx={{
            ...DEFAULT_SX,
            ...(sx || {})
        }}>
            {children}
        </Box>
    )
}
