'use client'

import React from 'react'

import Stack from '@mui/material/Stack';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Theme, SxProps, useTheme, IconButton, Typography } from '@mui/material';

interface Props {
    rows: any[];
    columns: GridColDef[];
    loading?: boolean;
    nextToken?: string;
    pageSize?: number;
    loadMore?: () => Promise<void>;
    onRowClick?: GridEventListener<"rowClick">
    sx?: SxProps<Theme>;
}

export default function ScoTable({ rows, columns, nextToken, pageSize = 10, loading, sx = {}, loadMore, onRowClick }: Props) {

    const theme = useTheme();

    const [loadedPages, setLoadedPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);

    const handleNextClick = async () => {
        if (currentPage === loadedPages && nextToken && loadMore) {
            await loadMore();
            setLoadedPages(loadedPages + 1);
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <Stack
            sx={{
                ...sx,
                border: "1px solid",
                borderColor: theme.palette.grey[400],
                borderRadius: "0.4rem",
            }}>
            <DataGrid
                hideFooter
                disableRowSelectionOnClick
                loading={loading}
                rows={rows}
                columns={columns}
                onRowClick={onRowClick}
                sx={{ "& .MuiDataGrid-row": { cursor: onRowClick ? "pointer" : undefined } }}
                autoHeight
            />
            <Stack direction="row" justifyContent="end" alignItems="center" spacing={1} sx={{ p: 1 }}>
                <Box>
                    <Typography variant="body2" color="textSecondary">
                        {currentPage}/...
                    </Typography>
                </Box>
                <Box>
                    <IconButton disabled={currentPage < 2} aria-label="delete">
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={handleNextClick} disabled={!nextToken} aria-label="delete">
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </Box>
            </Stack>
        </Stack>
    )
}