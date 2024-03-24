'use client';

import React, { useMemo, useState, ReactNode, useCallback } from "react";

import Slide from "@mui/material/Slide";
import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

import { SnackbarContext } from "./snackbar-context";

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [duration, setDuration] = useState(2000);
    const [severity, setSeverity] = useState("success"); /** error | warning | info */

    const showMessage = useCallback((
        newMessage: string,
        newSeverity: AlertColor | undefined = "success",
        newDuration = 2000
    ) => {
        setMessage(newMessage);
        setSeverity(newSeverity);
        setDuration(newDuration);
        setOpen(true);
    }, []);

    const handleClose = (
        event: React.SyntheticEvent<any> | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const values = useMemo(() => ({ showMessage }), [showMessage]);

    return (
        <SnackbarContext.Provider value={values}>
            {children}
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                autoHideDuration={duration}
                open={open}
                onClose={handleClose}
                TransitionComponent={Slide}
            >
                <Alert
                    variant="filled"
                    onClose={e => handleClose(e as React.SyntheticEvent<any>)}
                    severity={severity as AlertColor}
                >
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
