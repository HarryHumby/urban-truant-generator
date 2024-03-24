'use client';

import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Select, MenuItem, Stack } from '@mui/material';

import { RHFTextField } from '.';
import FormProvider from './form-provider';
import { FormConfig, FormConfigField } from './types';

interface Props<T> {
    form: FormConfig<T>;
    loading?: boolean;
    onSubmit: (data: T) => void;
}

export default function RHForm<T>({ form, loading, onSubmit: externalOnSubmit }: Props<T>) {

    const methods = useForm({
        resolver: form.yupSchema ? yupResolver(form.yupSchema) : undefined,
        defaultValues: form?.defaultValues as any || {},
    });

    const {
        handleSubmit,
        formState: {
            defaultValues,
            isSubmitting: submitting
        },
    } = methods;

    const onSubmit = handleSubmit(async (data: any) => {
        externalOnSubmit(data)
    });

    return (
        <FormProvider
            methods={methods}
            onSubmit={onSubmit}
        >

            <Stack spacing={2}>
                {form.fields.map((field, index) => <FormInput key={field.key} field={field} index={index} defaultValues={defaultValues} />)}

                <LoadingButton
                    fullWidth
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={submitting || loading}
                    disabled={submitting || loading}
                >
                    Login
                </LoadingButton>
            </Stack>
        </FormProvider>
    )
}

const FormInput = ({ field, index, defaultValues }: { field: FormConfigField<any>, index: number, defaultValues: any }) => {

    const defaultValue = defaultValues[field.key] || "";

    if (field.type === 'textarea') {
        return (
            <RHFTextField name={field.key} label={field.key} multiline rows={4} autoComplete={field.autoComplete} />
        )
    }

    if (field.type === "phone") {

        const phoneCountryCodeValue = defaultValues[`${field.key}CountryCode`];

        return (
            <Stack direction="row" alignItems="center" spacing={2} key={field.key + index}>
                <Select defaultValue={phoneCountryCodeValue} name={`${field.key}CountryCode`}>
                    <MenuItem value="+44">+44</MenuItem>
                </Select>
                <RHFTextField defaultValue={defaultValue} name={field.key} label={field.key} type="tel" autoComplete={field.autoComplete} />
            </Stack>
        )

    }

    return (
        <RHFTextField defaultValue={defaultValue} name={field.key} label={field.key} autoComplete={field.autoComplete} />
    )
}