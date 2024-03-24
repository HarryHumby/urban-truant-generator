'use client';

import { useContext, createContext } from "react";

import { AlertColor } from "@mui/material/Alert";

// ** Defaults
const defaultProvider: {
    showMessage: (message: string, severity?: AlertColor | undefined, duration?: number) => void;
} = {
    showMessage: (message: string, severity?: AlertColor | undefined, duration?: number) => null
};

export const SnackbarContext = createContext(defaultProvider);

export const useSnackbarContext = () => {
    const context = useContext(SnackbarContext);

    if (!context) throw new Error('useSnackbar must be use inside SettingsProvider');

    return context;
};

