import React from 'react'
import { useTranslation } from 'react-i18next';

import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { SxProps, useTheme } from '@mui/material/styles';

import ScoCard from '../sco-card';

interface Props {
    open: boolean
    children: React.ReactNode
    actionTransaltionString?: string
    closeTranslationString?: string
    actionDisabled?: boolean
    handleClose: () => void
    handleAction?: () => void
    sx?: SxProps
}

export default function CustomModal({ children, open, actionTransaltionString, closeTranslationString, actionDisabled = false, sx, handleClose, handleAction }: Props) {

    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={sx}
        >
            <Stack sx={{ height: "100%", width: "100%", p: 10 }} alignItems="center" justifyContent="center">
                <ScoCard sx={{ backgroundColor: theme.palette.background.paper }}>
                    {children}

                    <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between" spacing={3}>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                        >
                            {t<string>(closeTranslationString || 'close')}
                        </Button>
                        {handleAction && (
                            <Button
                                variant="contained"
                                color='primary'
                                onClick={handleAction}
                                disabled={actionDisabled}
                            >
                                {t<string>(actionTransaltionString || 'ok')}
                            </Button>
                        )}
                    </Stack>

                </ScoCard>
            </Stack>
        </Modal>
    )
}
