import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { ServiceResponse } from 'src/services/types';

import { useSearcher } from 'src/components/entity-selector/use-searcher';


interface Props<T> {
    value?: T | undefined;
    labelKey: keyof T;
    uniqueKey: keyof T;
    externalGetItems: (q: string) => Promise<ServiceResponse<T[]> | undefined>;
    handleItemClick: (item: T) => void;
    inputLabel?: string;
}

export default function EntitySelector<T>({
    value,
    labelKey,
    uniqueKey,
    externalGetItems,
    handleItemClick,
    inputLabel
}: Props<T>) {

    const { t } = useTranslation();

    const getItems = useCallback(async (searchString: string) => externalGetItems(searchString), [externalGetItems]);

    const {
        options,
        loading,
        searchTerm,
        setSearchTerm
    } = useSearcher<T>({
        getItems,
    });

    return (
        <Autocomplete
            // OPTIONS  
            options={options}
            getOptionLabel={(option: T) => option[labelKey] as string}
            // SELECTED VALUE
            value={value || null}
            onChange={(e, newValue) => {
                if (newValue) handleItemClick(newValue);
            }}
            // Input Value
            inputValue={searchTerm}
            onInputChange={(e, newInputValue) => {
                setSearchTerm(newInputValue);
            }}
            // RENDER
            loading={loading}
            renderInput={(params: any) => <TextField
                {...params}
                label={t<string>(inputLabel || "searcher.label")}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <>
                            {loading ? (
                                <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                        </>
                    )
                }}
            />
            }
        />
    );
}
