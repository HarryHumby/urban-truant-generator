import Link from 'next/link';
import React, { useMemo } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';

interface Props {
    items: {
        id?: string;
        label: string;
        path?: string;
        index?: number;
    }[];
}

export default function Breadcrumbs({ items }: Props) {

    const theme = useTheme();
    const pathname = usePathname();

    const currentPath = useMemo(() => {
        let path = pathname;
        if (path.endsWith("/")) {
            path = path.substring(0, path.length - 1);
        }
        return path;
    }, [pathname]);

    return (
        <Stack sx={{
            borderBottom: `1px solid ${theme.palette.grey[400]}`
        }} direction="row" spacing={1}>
            {items.map((item, index) => <BreadcrumbItem key={(item.id || "") + index} item={item} index={index} currentPath={currentPath} length={items.length} />)}
        </Stack>
    )
}

const BreadcrumbItem = ({ item, index, currentPath, length }: { item: any, index: number, currentPath: string, length: number }) => {

    const key = item.id || item.label.toLowerCase().replace(/\s/g, "-") + index;

    const isCurrentPath = useMemo(() => {
        if (item.path?.includes("*")) {
            const pathParts = item.path.split("*");
            const pathStart = pathParts[0];
            return currentPath.startsWith(pathStart);
        }
        return currentPath === item.path;
    }, [currentPath, item.path]);

    return (
        <>
            <Box key={key} sx={{ p: 1 }}>
                {item.path && !isCurrentPath ? (
                    <Link href={item.path}>
                        {item.label}
                    </Link>
                ) : (
                    <Box>
                        {item.label}
                    </Box>
                )}
            </Box>
            {index !== length - 1 && (
                <Box sx={{ p: 1 }}>
                    /
                </Box>
            )}
        </>
    )
}
